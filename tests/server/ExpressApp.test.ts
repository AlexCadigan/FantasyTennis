import request from "supertest";
import ExpressApp from "../../server/ExpressApp";

class ExpressAppTest {
	public runTests(): void {
		describe("Test ExpressApp.ts", () => {
			it("Test test", async () => {
				const testExpressApp = new ExpressApp("3000");

				const res = await request(testExpressApp.getExpressApp()).get("/404Error");
				expect(res.status).toEqual(404);
			});
		});
	}
}

new ExpressAppTest().runTests();
