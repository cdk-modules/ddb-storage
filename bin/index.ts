import { DdbStorage } from '../lib';
import { CfnOutput as Output, Stack, App, StackProps, Aws, CfnParameter as Parameter } from '@aws-cdk/cdk';

export class DdbStorageStack extends Stack {

  /** @returns the DdbStorage construct instance */
  public readonly storage: DdbStorage;

  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const parameters = this.generateParameters()
    this.storage = new DdbStorage(this, 'DdbStorage', {
      tableName: parameters.tableName.value.toString(),
      keyName: parameters.keyName.value.toString()
    });
    this.generateOutputs()
  }

  generateParameters () {
    let tableName = new Parameter(this, 'TableName', {
      description: 'Name of the storage table',
      default: 'MyTable',
      type: "String",
      allowedPattern: "[a-zA-Z0-9]+",
      constraintDescription: 'The table name can only include characters and digits'
    });

    let keyName = new Parameter(this, 'TableName', {
      description: 'Name of the table primary key',
      default: 'Id',
      type: "String",
      allowedPattern: "[a-zA-Z0-9]+",
      constraintDescription: 'The table key can only include characters and digits'
    });

    return {
      tableName, keyName
    }
  }

  generateOutputs () {
    const disableExport = true;

    // Core
    new Output(this, 'AwsAccountId', { value: Aws.accountId, disableExport });
    new Output(this, 'AwsRegion', { value: Aws.region, disableExport });

    new Output(this, 'TableName', { value: this.storage.table.tableName, disableExport });
    new Output(this, 'ReadAccessPolicy', { value: this.storage.readAccessPolicy.policyName, disableExport });
    new Output(this, 'WriteAccessPolicy', { value: this.storage.writeAccessPolicy.policyName, disableExport });
    new Output(this, 'AdminAccessPolicy', { value: this.storage.adminAccessPolicy.policyName, disableExport });
  }
}
