export function createHealthController() {
  return {
    health(_req, res) {
      res.status(200).json({ status: 'ok', service: 'vms-api' });
    }
  };
}
