// Custom middleware that logs out the type and path of each request to the server
const clog = (req, res, next) => {
  const fgCyan = '\x1b[36m';
  const FgMagenta = '\x1b[35m';
  const FgYellow = '\x1b[32m';

  switch (req.method) {
    case 'GET': {
      console.info(`🎾 ${fgCyan}${req.method} while the getting's good request to ${req.path}`);
      break;
    }
    case 'POST': {
      console.info(`🦋 ${FgMagenta}${req.method} up for a request to ${req.path}`);
      break;
    }
    default:
      console.log(`🦊 ${FgYellow}${req.method} ... Asking for a fox- request to ${req.path}`);
  }

  next();
};

exports.clog = clog;
