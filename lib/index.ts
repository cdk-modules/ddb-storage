import { Construct } from '@aws-cdk/cdk';
import { Table, BillingMode, AttributeType } from '@aws-cdk/aws-dynamodb';
import { Policy, PolicyStatement } from '@aws-cdk/aws-iam'

export interface DdbStorageProps {

  tableName: string,
  keyName: string,
}

export class DdbStorage extends Construct {
  
  /** @returns the DynamoDB table */
  public readonly table: Table;

  /** @returns the read access policy */
  public readonly readAccessPolicy: Policy;

  /** @returns the writes access policy */
  public readonly writeAccessPolicy: Policy;

  /** @returns the admin access policy */
  public readonly adminAccessPolicy: Policy;

  constructor(scope: Construct, id: string, props: DdbStorageProps = {
    keyName: 'Id',
    tableName: 'MyTable'
  }) {
    super(scope, id);
    
    this.table = new Table(this, 'Table', {
      billingMode: BillingMode.PayPerRequest,
      tableName: props.tableName,
      partitionKey: {
        name: props.keyName,
        type: AttributeType.String
      }
    });

    this.readAccessPolicy = new Policy(this, 'ReadAccessPolicy')
    this.readAccessPolicy.addStatement(new PolicyStatement()
      .addActions(
        'dynamodb:GetItem',
        'dynamodb:Query'
      )
      .addResource(this.table.tableArn)
    );

    this.writeAccessPolicy = new Policy(this, 'WriteAccessPolicy')
    this.writeAccessPolicy.addStatement(new PolicyStatement()
      .addActions(
        'dynamodb:PutItem',
        'dynamodb:UpdateItem',
        'dynamodb:DeleteItem'
      )
      .addResource(this.table.tableArn)
    );

    this.adminAccessPolicy = new Policy(this, 'AdminAccessPolicy')
    this.adminAccessPolicy.addStatement(new PolicyStatement()
      .addAction('dynamodb:*')
      .addResource(this.table.tableArn)
    );
  }
}
