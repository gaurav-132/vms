export class VisitorController {
  constructor(visitorService) {
    this.visitorService = visitorService;
  }

  async list(req, res) {
    const visitors = await this.visitorService.getVisitors(req.query.tenantId);
    res.status(200).json({ data: visitors });
  }

  async create(req, res) {
    const visitor = await this.visitorService.createVisitor(req.body);
    res.status(201).json({ data: visitor });
  }
}
