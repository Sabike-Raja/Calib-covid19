// System configuration
export default () => ({
  port: parseInt(process.env.HTTP_PORT, 10) || 5000
});
