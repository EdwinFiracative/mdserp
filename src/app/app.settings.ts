import { InjectionToken } from '@angular/core';

export interface AppSettings {
  title: string;
  version: string;
  apiUrl: string;
}

export const appSettings: AppSettings = {
  title: 'MDSERP',
  version: '1.0',
  apiUrl: 'http://localhost:8080',
};

export const APP_SETTINGS = new InjectionToken<AppSettings>('app.settings');
