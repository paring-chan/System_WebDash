export function buildError({ code = 404, message = 'Not found' }): object {
  return { code, message }
}
