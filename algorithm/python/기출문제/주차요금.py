def solution(fees, records): #feed: [기본 시간(분), 기본 요금(원), 단위 시간(분), 단위 요금(원)]
    answer = []
    base_time, base_fee, unit_term, unit_fee = fees
    stayed_time = {}
    final_fee = {}
    in_time = {}
    for record in records:
        time, num, in_or_out = record.split()
        if in_or_out == "IN":
            in_time[num] = time
        else:
            out_h, out_m = list(map(int, time.split(':')))
            in_h, in_m = list(map(int, in_time[num].split(':')))
            in_time.pop(num)
            if num in stayed_time:
                stayed_time[num] += (out_h - in_h) * 60 + (out_m - in_m)
            else:
                stayed_time[num] = (out_h - in_h) * 60 + (out_m - in_m)

    for num, time in in_time.items(): #출차 안 한 차 처리
        out_h, out_m = 23, 59
        in_h, in_m = list(map(int, time.split(':')))
        if num in stayed_time:
            stayed_time[num] += (out_h - in_h) * 60 + (out_m - in_m)
        else:
            stayed_time[num] = (out_h - in_h) * 60 + (out_m - in_m)

    for num, stayed_m in stayed_time.items():
        stayed_m -= base_time
        if stayed_m <= 0:
            final_fee[num] = base_fee
            continue
        else:
            fee = unit_fee * ((stayed_m)//unit_term) + base_fee

        if stayed_m % unit_term >0: #나머지가 있으면
            fee += unit_fee
        final_fee[num] = fee
    
    final_fee = list(final_fee.items())
    final_fee.sort()
    for num, fee in final_fee:
        answer.append(fee)
    return answer

# print(solution([180, 5000, 10, 600],["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"]))