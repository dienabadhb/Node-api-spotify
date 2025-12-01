import "mocha";
import { expect } from "chai";
import * as emailModule from "../src/utils/email_Paiement";
import sinon from "sinon";

describe("Email paiement test", () => {
  let sendStub: sinon.SinonStub;

  before(() => {
    // Stub pour éviter l'envoi réel
    sendStub = sinon.stub(emailModule, "sendPaymentConfirmation").resolves();
  });

  after(() => {
    sendStub.restore();
  });

  it("doit appeler sendPaymentConfirmation sans planter", async () => {
    await emailModule.sendPaymentConfirmation({
      to: "test@example.com",
      amount: 9.99,
      productName: "Abonnement Premium",
    });

    expect(sendStub.calledOnce).to.be.true;
  });
});
