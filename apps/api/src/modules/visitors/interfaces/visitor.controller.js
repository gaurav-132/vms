import { HttpError } from '../../../core/http-error.js';

export function createVisitorController(visitorService) {
  return {
    list: async (req, res, next) => {
      try {
        const tenantId = req.query.tenantId;
        const visitors = await visitorService.listByTenant(tenantId);
        res.status(200).json({ data: visitors });
      } catch (error) {
        next(error);
      }
    },

    register: async (req, res, next) => {
      try {
        const created = await visitorService.register(req.body);
        res.status(201).json({ data: created });
      } catch (error) {
        next(error);
      }
    },

    errorHandler: (error, _req, res, _next) => {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}
