export class HealthController {
  status(_req, res) {
    res.status(200).json({ status: 'ok', service: 'vms-api' });
  }
}
