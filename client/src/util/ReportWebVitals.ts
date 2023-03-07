import { onCLS, onFCP, onFID, onLCP, onTTFB, ReportCallback } from "web-vitals";

/**
 * Generates a report of performance metrics for the web app.
 * @param {ReportCallback} reportHandler Function that handles outputting the report data.
 */
export default function reportMetrics(reportHandler: ReportCallback): void {
	if (reportHandler && reportHandler instanceof Function) {
		onCLS(reportHandler);
		onFID(reportHandler);
		onFCP(reportHandler);
		onLCP(reportHandler);
		onTTFB(reportHandler);
	}
}
