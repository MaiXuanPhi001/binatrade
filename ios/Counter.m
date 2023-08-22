//
//  Counter.m
//  binatrade
//
//  Created by DK Tech on 17/08/2023.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Counter,NSObject);

RCT_EXTERN_METHOD(increment: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(decrement:
                  (RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(pushNotifi)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
