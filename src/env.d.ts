interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  /**
   * Built-in environment variable.
   * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
   */
  readonly NG_APP_ENV: string;
  // Add your environment variables below
  // readonly NG_APP_API_URL: string;
  [key: string]: any;
  readonly NG_APP_URL_API: string;
  readonly NG_APP_THERAPIST: string;
  readonly NG_APP_ADMIN: string;
  readonly NG_APP_PATIENT: string;
  readonly NG_APP_TITLE: string;
  readonly NG_APP_FIRSTNAME: string;
  readonly NG_APP_CATEGORYNAME: string;
  readonly NG_APP_ITEMS_FOR_PAGE: number;
  readonly NG_APP_INITIAL_PAGE: number;
}

/*
 * Remove all the deprecated code below if you're using import.meta.env (recommended)
 */

/****************************** DEPREACTED **************************/
/**
 * @deprecated process.env usage
 * prefer using import.meta.env
 * */
/* declare var process: {
  env: {
    NG_APP_ENV: string;
    [key: string]: any;
  };
}; */

// If your project references @types/node directly (in you) or indirectly (as in RxJS < 7.6.0),
// you might need to use the following declaration merging.
// declare namespace NodeJS {
//   export interface ProcessEnv {
//     readonly NG_APP_ENV: string;
//     // Add your environment variables below
//   }
// }

// If you're using Angular Universal and process.env notation, you'll need to add the following to your tsconfig.server.json:
/* In your tsconfig.server.json */
// {
//   "extends": "./tsconfig.app.json",
//   ...
//   "exclude": [
//     "src/env.d.ts"
//   ]
// }

/*********************************************************************/
