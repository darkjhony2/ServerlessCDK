import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as widget_service from './widget_service';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ServerlessCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    new widget_service.WidgetService(this, 'Widgets');
    
  }
}
