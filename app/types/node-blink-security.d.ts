declare module "node-blink-security" {
  export default class Blink {
    constructor(email: string, password: string, deviceId: string, options?: {
      auth_2FA?: boolean;
      verification_timeout?: number;
      device_name?: string;
    });

    cameras: Record<string, unknown>;
    idTable: Record<string, string>;
    networks: Record<string, unknown>;
    accountId: string;
    region: string;
    regionId: string;

    setupSystem(systemNameOrId?: string): Promise<void>;
    refresh(): Promise<void>;
    getSummary(): Promise<unknown>;
    getCameraThumbs(): Promise<void>;
    getVideos(page: number, date: Date): Promise<unknown>;
    getEvents(): Promise<unknown>;
    isOnline(): Promise<boolean>;
    getLastMotions(): Promise<void>;
    isArmed(): Promise<boolean>;
    setArmed(armed?: boolean, networkIds?: string[]): Promise<void>;
    getCameras(): Promise<void>;
    getLinks(): Promise<void>;
    getIDs(): Promise<void>;
    getClients(): Promise<unknown>;
  }
}
