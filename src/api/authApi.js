const DEMO_USER = {
  username: '230408035@stu.biruni.edu.tr',
  password: 'demo123456',
};

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const trimmedUser = username.trim().toLowerCase();
      const validUser = DEMO_USER.username.toLowerCase();

      // Check credentials against demo account
      if (trimmedUser === validUser && password === DEMO_USER.password) {
        resolve({ username: trimmedUser });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}