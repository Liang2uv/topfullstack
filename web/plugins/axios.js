export default function ({ $axios, redirect, $login }) {
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      // 弹出登录框
      $login()
    }
  })
}