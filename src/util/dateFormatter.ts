const TIME_ZONE_OFFSET = 9
const HOUR_TO_MS = 60 * 60 * 1000
const KR_TIME_DIFF = TIME_ZONE_OFFSET * HOUR_TO_MS

export const UTCToKST = (utc: number) => new Date(utc + KR_TIME_DIFF)