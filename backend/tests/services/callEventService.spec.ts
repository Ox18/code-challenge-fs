import {CallEventRepositoryImpl} from "../../src/infra/db/mongodb/repositories/callEvent.repository.impl";
import {CallEventServiceImpl} from "../../src/features/calls/services/implements/callEvent.service.impl";

describe("CallEventService", () => {
  it("crear call event: call_answered", async () => {
    const callEventRepository = new CallEventRepositoryImpl();
    const callEventService = new CallEventServiceImpl(callEventRepository);

    await callEventRepository.create({
      call_id: "67eda6d16bf03d62960d349c",
      type: "call_answered",
      metadata: {wait_time: 25},
    });

    const callEvents = await callEventService.get("67eda6d16bf03d62960d349c");

    expect(callEvents).toBeDefined();
  });

  it("crear call event: call_ended", async () => {
    const callEventRepository = new CallEventRepositoryImpl();
    const callEventService = new CallEventServiceImpl(callEventRepository);

    await callEventRepository.create({
      call_id: "67eda6d16bf03d62960d349c",
      type: "call_ended",
      metadata: {end_reason: "completed", duration: 7},
    });

    const callEvents = await callEventService.get("67eda6d16bf03d62960d349c");

    expect(callEvents).toBeDefined();
  });

  it("crear call event: call_initiated", async () => {
    const callEventRepository = new CallEventRepositoryImpl();
    const callEventService = new CallEventServiceImpl(callEventRepository);

    await callEventRepository.create({
      call_id: "67eda6d16bf03d62960d349c",
      type: "call_initiated",
      metadata: {type: "video", queue_id: "67ea1dabc51f501686a05b55"},
    });

    const callEvents = await callEventService.get("67eda6d16bf03d62960d349c");

    expect(callEvents).toBeDefined();
  });

  it("crear call event: call_routed", async () => {
    const callEventRepository = new CallEventRepositoryImpl();
    const callEventService = new CallEventServiceImpl(callEventRepository);

    await callEventRepository.create({
      call_id: "67eda6d16bf03d62960d349c",
      type: "call_routed",
      metadata: {agent_id: "67eda6a76bf03d62960d349b", routing_time: 0},
    });

    const callEvents = await callEventService.get("67eda6d16bf03d62960d349c");

    expect(callEvents).toBeDefined();
  });

  it("crear call event: hold", async () => {
    const callEventRepository = new CallEventRepositoryImpl();
    const callEventService = new CallEventServiceImpl(callEventRepository);

    await callEventRepository.create({
      call_id: "67eda6d16bf03d62960d349c",
      type: "call_hold",
      metadata: {hold_duration: 10},
    });

    const callEvents = await callEventService.get("67eda6d16bf03d62960d349c");

    expect(callEvents).toBeDefined();
  });

  it("obtener todos los eventos", async () => {
    const callEventRepository = new CallEventRepositoryImpl();
    const callEventService = new CallEventServiceImpl(callEventRepository);

    const callEvents = await callEventService.get("67eda6d16bf03d62960d349c");

    expect(callEvents.length).toBeGreaterThanOrEqual(4);
  })
});
