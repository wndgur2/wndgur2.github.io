def solution(phone_book):
    phone_book.sort()
    bef = "a"
    ln = 1
    for number in phone_book:
        lb = ln
        ln = len(number)
        if(ln >= lb):
            if(number[:lb] == bef):
                return False
        bef = number
    return True