def solution(bridge_length, weight, truck_weights):
    answer = 0
    trucksOnBridge = [0 for _ in range(bridge_length)]
    bridgeWeight = 0
    
    while (truck_weights != []):
        t = truck_weights[0]
        if(bridgeWeight - trucksOnBridge[0] + t <= weight):
            truck_weights.pop(0)
            trucksOnBridge.append(t)
            bridgeWeight += t
        else:
            trucksOnBridge.append(0)
        bridgeWeight -= trucksOnBridge.pop(0)
        answer += 1
    
    while (bridgeWeight > 0):
        bridgeWeight -= trucksOnBridge.pop(0)
        answer += 1
    
    return answer