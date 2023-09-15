const debounce = (callback: Function, wait: number): Function => {
  let timer;

  const debouncedFunc = () => {
    if (shouldCallCallback(Date.now())) {
      callback();
    } else {
      timer = startTimer(callback);
    }
  }

  return debouncedFunc;
}
