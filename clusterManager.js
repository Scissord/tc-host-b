import cluster from 'cluster';
import os from 'os';

export function setupCluster(workerCallback) {
  if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(`Primary process ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} exited. Restarting...`);
      cluster.fork();
    });
  } else {
    workerCallback();
  }
}
