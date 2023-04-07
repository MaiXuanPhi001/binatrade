# using npm

# check KYC for user = api checkKycUser

// Not kyc
# {"message":"user is not kyc","errors":"error","status":false}
// pendding kyc
# {"data": "PENDING", message: "get data success", status: true}
// Already kyc
# {"data": "APPROVED", "message": "get data success", "status": true}
//

# profile.twofa === 0 => protection is not enabled, can't change password

# 1-30: order, 31-60: wait

// run app
# npm install
# npx react-native run-ios
