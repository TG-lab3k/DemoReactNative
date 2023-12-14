import dayjs from 'dayjs';

function tick() {
  const nowAt = dayjs();
  console.log('#tick# ', nowAt);
}

export function startTimer() {
  const timerID = setInterval(() => tick(), 5000);
  console.log('#Timer# ', timerID);
}

export function startTimeout() {
  const timeoutId = setTimeout(() => {
    const nowAt = dayjs();
    console.log('#timeout# ', nowAt);
  }, 5000);
  console.log('#timeout# ', timeoutId);
}
