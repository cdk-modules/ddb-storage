import sns = require('@aws-cdk/aws-sns');
import sqs = require('@aws-cdk/aws-sqs');
import cdk = require('@aws-cdk/cdk');

export interface DdbStorageProps {
  /**
   * The visibility timeout to be configured on the SQS Queue, in seconds.
   *
   * @default 300
   */
  visibilityTimeout?: number;
}

export class DdbStorage extends cdk.Construct {
  /** @returns the ARN of the SQS queue */
  public readonly queueArn: string;

  constructor(scope: cdk.Construct, id: string, props: DdbStorageProps = {}) {
    super(scope, id);

    const queue = new sqs.Queue(this, 'DdbStorageQueue', {
      visibilityTimeoutSec: props.visibilityTimeout || 300
    });

    const topic = new sns.Topic(this, 'DdbStorageTopic');

    topic.subscribeQueue(queue);

    this.queueArn = queue.queueArn;
  }
}
