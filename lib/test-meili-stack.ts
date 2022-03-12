import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { Construct } from 'constructs';
import { HttpIntegration, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { cwd } from 'process';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TestMeiliStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const code = lambda.DockerImageCode.fromImageAsset(cwd() + "/src");

    const myLambda = new lambda.DockerImageFunction(this, "Lambda", {
      code,
    });

    const api = new apigw.RestApi(this, "RestAPI", {});
    const resource = api.root.addResource("{proxy+}", {
      defaultIntegration: new LambdaIntegration(myLambda),
    });

    resource.addMethod("ANY");
  }
}
