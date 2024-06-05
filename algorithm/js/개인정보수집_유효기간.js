const cal_days = (date) => {
    days = 0;
    [y, m, d] = date.split('.');
    days += parseInt(y) * 12 * 28;
    days += parseInt(m) * 28;
    days += parseInt(d);
    return days
}
function solution(today, terms, privacies) {
    var answer = [];
    term_dict = {};
    terms.forEach(term => {
        [name, months] = term.split(' ');
        term_dict[name] = months;
    });

    today_days = cal_days(today);

    privacies.forEach((priv, index) => {
        [date, name] = priv.split(' ');
        days = cal_days(date);
        dif_days = today_days - days;
        if (term_dict[name] * 28 <= dif_days)
            answer.push(index + 1);
    })
    return answer;
}