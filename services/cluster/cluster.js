import os from 'os';
import cluster from 'cluster';
// import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default function setupCluster(workerCallback, minWorkers = 1) {
  if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(`Primary process ${process.pid} is running`);

    const totalWorkers = Math.max(minWorkers, numCPUs);

    for (let i = 0; i < totalWorkers; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} exited. Because: ${code, signal} Restarting...`);

      const activeWorkers = Object.keys(cluster.workers).length;

      if (activeWorkers < minWorkers) {
        console.log(`Active workers below minimum (${activeWorkers}/${minWorkers}). Starting a new worker.`);
        cluster.fork();
      }
    });
  } else {
    // const __dirname = dirname(fileURLToPath(import.meta.url));
    // cluster.setupPrimary({
    //   exec: __dirname + '/server.js',
    // });

    workerCallback();
  }
}
