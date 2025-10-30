import dayjs from 'dayjs'

// dayjs api 获取这个月的天数
console.log(dayjs('2023-11-1').daysInMonth())

// dayjs api 获取这个月的第一天，格式为YYYY-MM-DD
console.log(dayjs('2023-11-1').startOf('month').format('YYYY-MM-DD'))

// dayjs api 获取这个月的最后一天，格式为YYYY-MM-DD
console.log(dayjs('2023-11-1').endOf('month').format('YYYY-MM-DD'))
