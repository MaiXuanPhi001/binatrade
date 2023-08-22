//
//  Counter.swift
//  binatrade
//
//  Created by DK Tech on 17/08/2023.
//

import Foundation

@objc(Counter)
class Counter: NSObject, UIApplicationDelegate, UNUserNotificationCenterDelegate {
  private var count = 0;
  
  @objc
  func increment(_ callback: RCTResponseSenderBlock) {
    count += 1;
//    print(count)
    callback([count])
  }
  
  @objc
  func pushNotifi() {
    let notificationCenter = UNUserNotificationCenter.current()
    notificationCenter.getNotificationSettings { settings in
        switch settings.authorizationStatus {
        case .authorized:
            self .dispatchNotification()
        case .denied:
             return
        case .notDetermined:
            notificationCenter.requestAuthorization(options: [.alert, .sound]) { didAllow, error in
                if didAllow {
                    self .dispatchNotification()
                }
            }
        default:
            return
        }
    }
  }
  
  @objc
  func dispatchNotification() {
      let content = UNMutableNotificationContent()
      content.title = "This is title"
      content.subtitle = "This is subtitle"
      content.sound = UNNotificationSound.default
      content.badge = 1
      
      let trigger = UNTimeIntervalNotificationTrigger(
          timeInterval: 5,
          repeats: false
      )
      
      let request = UNNotificationRequest(
          identifier: UUID().uuidString,
          content: content,
          trigger: trigger
      )
      
      UNUserNotificationCenter.current().add(request)
  }
  
  @objc
  static func requiresMaiQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func constantsToExport() -> [String: Any] {
    return ["initialCount": 0];
  }
  
  @objc
  func decrement(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock)
  {
    if (count == 0)
    {
      let error = NSError(domain: "", code: 200, userInfo: nil);
      reject("ERROR_COUNT", "count cannot be negative", error);
    }
    else {
      resolve("count is \(count)");
    }
  }
}
