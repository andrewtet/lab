declare module "node-blink-security" {
  export default class Blink {
    constructor(email: string, password: string, deviceId: string, options?: {
      auth_2FA?: boolean;
      verification_timeout?: number;
      device_name?: string;
    });

    cameras: any;
    idTable: Record<string, string>;
    networks: any;
    accountId: string;
    region: string;
    regionId: string;

    setupSystem(systemNameOrId?: string): Promise<void>;
    refresh(): Promise<void>;
    getSummary(): Promise<any>;
    getCameraThumbs(): Promise<void>;
    getVideos(page: number, date: Date): Promise<any>;
    getEvents(): Promise<any>;
    isOnline(): Promise<boolean>;
    getLastMotions(): Promise<void>;
    isArmed(): Promise<boolean>;
    setArmed(armed?: boolean, networkIds?: string[]): Promise<void>;
    getCameras(): Promise<void>;
    getLinks(): Promise<void>;
    getIDs(): Promise<void>;
    getClients(): Promise<any>;
  }
}
