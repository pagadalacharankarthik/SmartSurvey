"use client"

// Offline storage utilities for survey data
export class OfflineStorage {
  private dbName = "SmartSurveyDB"
  private version = 1
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        if (!db.objectStoreNames.contains("surveys")) {
          const surveyStore = db.createObjectStore("surveys", { keyPath: "id" })
          surveyStore.createIndex("status", "status", { unique: false })
        }

        if (!db.objectStoreNames.contains("responses")) {
          const responseStore = db.createObjectStore("responses", { keyPath: "id" })
          responseStore.createIndex("surveyId", "surveyId", { unique: false })
          responseStore.createIndex("syncStatus", "syncStatus", { unique: false })
        }

        if (!db.objectStoreNames.contains("syncQueue")) {
          const syncStore = db.createObjectStore("syncQueue", { keyPath: "id", autoIncrement: true })
          syncStore.createIndex("timestamp", "timestamp", { unique: false })
        }
      }
    })
  }

  async storeSurvey(survey: any): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["surveys"], "readwrite")
    const store = transaction.objectStore("surveys")
    await store.put(survey)
  }

  async getSurveys(): Promise<any[]> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["surveys"], "readonly")
    const store = transaction.objectStore("surveys")

    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async storeResponse(response: any): Promise<void> {
    if (!this.db) await this.init()

    const responseWithSync = {
      ...response,
      syncStatus: "pending",
      timestamp: Date.now(),
    }

    const transaction = this.db!.transaction(["responses"], "readwrite")
    const store = transaction.objectStore("responses")
    await store.put(responseWithSync)
  }

  async getPendingResponses(): Promise<any[]> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["responses"], "readonly")
    const store = transaction.objectStore("responses")
    const index = store.index("syncStatus")

    return new Promise((resolve, reject) => {
      const request = index.getAll("pending")
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async markResponseSynced(responseId: string): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["responses"], "readwrite")
    const store = transaction.objectStore("responses")

    const getRequest = store.get(responseId)
    getRequest.onsuccess = () => {
      const response = getRequest.result
      if (response) {
        response.syncStatus = "synced"
        store.put(response)
      }
    }
  }

  async addToSyncQueue(data: any): Promise<void> {
    if (!this.db) await this.init()

    const queueItem = {
      data,
      timestamp: Date.now(),
      retryCount: 0,
    }

    const transaction = this.db!.transaction(["syncQueue"], "readwrite")
    const store = transaction.objectStore("syncQueue")
    await store.add(queueItem)
  }

  async getSyncQueue(): Promise<any[]> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["syncQueue"], "readonly")
    const store = transaction.objectStore("syncQueue")

    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async removeFromSyncQueue(id: number): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["syncQueue"], "readwrite")
    const store = transaction.objectStore("syncQueue")
    await store.delete(id)
  }

  async clearAllData(): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["surveys", "responses", "syncQueue"], "readwrite")

    await Promise.all([
      transaction.objectStore("surveys").clear(),
      transaction.objectStore("responses").clear(),
      transaction.objectStore("syncQueue").clear(),
    ])
  }
}

// Singleton instance
export const offlineStorage = new OfflineStorage()

// Sync manager for handling online/offline synchronization
export class SyncManager {
  private isOnline = navigator.onLine
  private syncInProgress = false

  constructor() {
    // Listen for online/offline events
    window.addEventListener("online", () => {
      this.isOnline = true
      this.syncPendingData()
    })

    window.addEventListener("offline", () => {
      this.isOnline = false
    })

    // Periodic sync when online
    setInterval(() => {
      if (this.isOnline && !this.syncInProgress) {
        this.syncPendingData()
      }
    }, 30000) // Sync every 30 seconds
  }

  async syncPendingData(): Promise<void> {
    if (this.syncInProgress || !this.isOnline) return

    this.syncInProgress = true

    try {
      // Sync pending responses
      const pendingResponses = await offlineStorage.getPendingResponses()

      for (const response of pendingResponses) {
        try {
          // Send to server
          const result = await fetch("/api/survey-responses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          })

          if (result.ok) {
            await offlineStorage.markResponseSynced(response.id)
          }
        } catch (error) {
          console.error("Failed to sync response:", error)
        }
      }

      // Sync queue items
      const queueItems = await offlineStorage.getSyncQueue()

      for (const item of queueItems) {
        try {
          // Process queue item based on type
          await this.processQueueItem(item)
          await offlineStorage.removeFromSyncQueue(item.id)
        } catch (error) {
          console.error("Failed to sync queue item:", error)
          // Increment retry count or remove after max retries
        }
      }
    } catch (error) {
      console.error("Sync failed:", error)
    } finally {
      this.syncInProgress = false
    }
  }

  private async processQueueItem(item: any): Promise<void> {
    // Process different types of queued data
    switch (item.data.type) {
      case "survey_response":
        await fetch("/api/survey-responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.data.payload),
        })
        break

      case "location_update":
        await fetch("/api/location-updates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.data.payload),
        })
        break

      default:
        console.warn("Unknown queue item type:", item.data.type)
    }
  }

  getConnectionStatus(): boolean {
    return this.isOnline
  }
}

// Singleton instance
export const syncManager = new SyncManager()
