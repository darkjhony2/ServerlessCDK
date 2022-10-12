import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_apigateway as apigateway, aws_lambda as lambda, aws_s3 as s3} from "aws-cdk-lib";

export class WidgetService extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const bucket = new s3.Bucket(this, "WidgetStore");

        const handler = new lambda.Function(this, "WidgetHandler", {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset("resources"),
            handler: "widgets.main",
            environment: {
                BUCKET: bucket.bucketName
            }
        });

        bucket.grantReadWrite(handler);

        const api = new apigateway.RestApi(this, "widgets-api", {
            restApiName: "Widget Service",
            description: "This service serves widgets."
        });

        const getWidgetsIntegration = new apigateway.LambdaIntegration(handler, {
            requestTemplates: { "application/json": '{"statusCode": "200"}'}
        });

        api.root.addMethod("GET", getWidgetsIntegration);

        const widget = api.root.addResource("{id}");

        const widgetIntegration = new apigateway.LambdaIntegration(handler);

        widget.addMethod("POST", widgetIntegration);
        widget.addMethod("GET", widgetIntegration);
        widget.addMethod("DELETE", widgetIntegration);
    }
}