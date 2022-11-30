import request from "supertest";
import ExpressApp from "../../server/ExpressApp";

/**
 * Unit tests for the ExpressApp class.
 */
class ExpressAppTest {
	/**
	 * Runs all unit tests for this class.
	 */
	public runTests(): void {
		describe("Test ExpressApp.ts", () => {
			it("Get request for non-existent route returns 404 error", async () => {
				const testExpressApp = new ExpressApp("3000");

				const res = await request(testExpressApp.getExpressApp()).get("/404Error");
				expect(res.status).toEqual(404);
			});
		});
	}
}

new ExpressAppTest().runTests();
