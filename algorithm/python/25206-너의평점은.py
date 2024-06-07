scores = [input().split() for _ in range(20)]

hash_grade = {
    "A+":4.5,
    "A0":4.0,
    "B+":3.5,
    "B0":3.0,
    "C+":2.5,
    "C0":2.0,
    "D+":1.5,
    "D0":1.0,
    "F":0.0
}
credit_sum = 0
grade_sum = 0
for subject, credit, grade in scores:
    if grade == "P":
        continue
    credit_sum += float(credit)
    grade_sum += float(credit) * hash_grade[grade]

print(format(grade_sum / credit_sum, "f"))