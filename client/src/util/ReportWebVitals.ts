import { onCLS, onFCP, onFID, onLCP, onTTFB, ReportCallback } from "web-vitals";

/**
 * Class for measuring performance of a React web app.
 */
export default class ReportWebVitals {
	/**
	 * Generates a report of performance metrics for the web app.
	 * @param {ReportCallback} reportHandler Function that handles outputting the report data.
	 */
	reportMetrics(reportHandler: ReportCallback): void {
		if (reportHandler && reportHandler instanceof Function) {
			onCLS(reportHandler);
			onFID(reportHandler);
			onFCP(reportHandler);
			onLCP(reportHandler);
			onTTFB(reportHandler);
		}
	}
}
