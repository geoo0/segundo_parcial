export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.type === 'validation') {
    return res.status(400).json({ error: err.message, details: err.details || null });
  }

  if (err.type === 'conflict') {
    return res.status(409).json({ error: err.message });
  }

  if (err.type === 'not_found') {
    return res.status(404).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal Server Error' });
}
