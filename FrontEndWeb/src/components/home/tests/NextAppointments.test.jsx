import { render, screen } from "@testing-library/react";
import HomeSidePanel from "../HomeSidePanel";
import QuickActions from "../QuickActions";
import RecentActivities from "../RecentActivities";

jest.mock("../QuickActions", () => jest.fn(() => <div>QuickActions Mock</div>));
jest.mock(
  "../RecentActivities",
  () =>
    jest.fn(({ activitiesData }) => (
      <div>RecentActivities Mock - {activitiesData.length} items</div>
    ))
);

describe('HomeSidePanel', () => {
    it('renderiza QuickActions e RecentActivities corretamente', () => {
        const fakeActivities = [{ id: 1 }, { id: 2 }];

        render(<HomeSidePanel activities={fakeActivities} />);

        expect(screen.getByText("QuickActions Mock")).toBeInTheDocument();
        expect(
            screen.getByText("RecentActivities Mock - 2 items")
        ).toBeInTheDocument();
    });

    it('passa as activities corretamente para RecentActivities', () => {
        const fakeActivities = [{ id: 10 }];

        render(<HomeSidePanel activities={fakeActivities} />);

        expect(RecentActivities).toHaveBeenCalledWith(
            { activitiesData: fakeActivities },
            {}
        );
    });
});

describe('Jest', () => {
    it('should work', () => {
        expect(1).toBe(1)
    });
});