import { DdbStorageStack } from './';
import { App } from '@aws-cdk/cdk';

const app = new App();
new DdbStorageStack(app, 'CdkModulesDdbStorageStandalone')

app.run();
