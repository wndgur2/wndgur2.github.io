house_N, raining_day = map(int, input().split())
house_altitudes = list(map(int, input().split()))
house_water_depths = [[0, 0] for _ in range(house_N)]

for current_day in range(raining_day):
    # rain
    s, e = map(int, input().split())
    for raining_house in range(s-1, e):
        house_water_depths[raining_house][0] += 1
        house_water_depths[raining_house][1] = current_day
    
    # drain
    if((current_day+1) %3 ==0):
        for house_water in house_water_depths:
            if house_water[0] == 0:
                continue
            if current_day - house_water[1]<3:
                house_water[0] -= 1

for house in range(house_N):
    print(house_altitudes[house] + house_water_depths[house][0], end=' ')
