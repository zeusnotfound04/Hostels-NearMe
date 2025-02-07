import cron from 'node-cron';
import { updateAdminInsights } from '@/actions/adminInsights/insight';


let isJobRunning = false;


async function handleCron() {
    if (isJobRunning) {
        console.log("Job is already running");
        return;
    }

    isJobRunning = true;
    try {
        isJobRunning = true;
        console.log(`[${new Date().toISOString()}] Running cron job`);
        await updateAdminInsights();

        console.log(`[${new Date().toISOString()}] Cron job completed`);

    } catch (error) {
        console.log(`[${new Date().toISOString()}] Error running cron job:`, error);
    } finally {
        isJobRunning = false;

    }
}



try {
    console.log(`${new Date().toISOString()}] Initializing cron job`);

    cron.schedule('0 0 1 * *', handleCron , {
        scheduled: true,
        timezone: "UTC"
    });

    handleCron();
    console.log(`${new Date().toISOString()}] Cron job successfully initialized`);
} catch (error) {
    console.error(`${new Date().toISOString()}] Error initializing cron job:`, error);
}