import React, {
  useEffect,
  useState,
  Fragment,
  useCallback,
  useRef,
} from "react";
import { useAuthContext } from "../context/user-context";
import {
  ButtonComponent,
  CheckBoxComponent,
} from "@syncfusion/ej2-react-buttons";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import {
  DropDownListComponent,
  MultiSelectComponent,
  CheckBoxSelection,
} from "@syncfusion/ej2-react-dropdowns";
import {
  ToolbarComponent,
  ItemsDirective,
  ItemDirective,
  AppBarComponent,
} from "@syncfusion/ej2-react-navigations";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Year,
  TimelineViews,
  TimelineMonth,
  TimelineYear,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import {
  addClass,
  Internationalization,
  removeClass,
  registerLicense,
} from "@syncfusion/ej2-base";
import { Query } from "@syncfusion/ej2-data";
import { useDataContext } from "../context/fetch-context";
import "../css/dashboard.css";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhKYVJzWmFZfVpgcV9FY1ZVQGYuP1ZhSXxXdkdiXX9bc3xVQmRfV0M="
);
import moment from "moment";

export const Dashboard = () => {
  const { logout, user } = useAuthContext();
  const [data, setData] = useState([]);
  const { shifts } = useDataContext();
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState("Week");
  const [isTimelineView, setIsTimelineView] = useState(false);
  let scheduleObj = useRef(null);
  let contextMenuObj = useRef(null);
  let timeBtn = useRef(null);
  let selectedTarget;
  let intl = new Internationalization();
  let workWeekObj = useRef(null);
  let resourceObj = useRef(null);
  let liveTimeInterval;

  let shiftData = [
    {
      Id: 1,
      Subject: "Shift",
      StartTime: "2024-02-11T10:00:00.000Z",
      EndTime: "2024-02-11T16:30:00.000Z",
      Location: "",
      Description: "Event Scheduled",
      RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;COUNT=10;",
      IsAllDay: false,
      IsReadonly: false,
      CalendarId: 1,
    },
    // {
    //   Id: 2,
    //   Subject: "Shift 1",
    //   StartTime: "2024-02-11T10:00:00.000Z",
    //   EndTime: "2024-02-11T11:30:00.000Z",
    //   Location: "",
    //   Description: "Event Scheduled",
    //   RecurrenceRule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;COUNT=10;",
    //   IsAllDay: false,
    //   IsReadonly: false,
    //   CalendarId: 1,
    // },
  ];
  const generateShiftEvents = (shiftStartTime, shiftEndTime) => {
    const start = moment(shiftStartTime);
    const end = moment(shiftEndTime);

    const diff = end.diff(start, "days");

    const shiftDuration = moment(shiftEndTime).diff(start);

    // Apply the duration to the start time to get the end time
    const endTime = moment(shiftStartTime).add(shiftDuration);

    return { diff: diff, endTime: endTime.toISOString() };
  };

  let mappedShifts = shifts.map((shift, i) => {
    return {
      Id: shift._id,
      Subject: shift.shiftName,
      StartTime: shift.shiftStartTime,
      EndTime: shift.shiftEndTime,
      Location: shift.locations[0]?.locationName || "",
      Description: shift.Description || "",
      RecurrenceRule: `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;COUNT=${
        generateShiftEvents(shift.shiftStartTime, shift.shiftEndTime).diff || 1
      };`,
      IsAllDay: false,
      IsReadonly: false,
      CalendarId: 1,
    };
  });

  // console.log("SHIFT DATA", shiftData);
  console.log("MAPPED SHIFT DATA", mappedShifts);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    setData(user);
  }, [user]);

  useEffect(() => {
    return () => {
      if (liveTimeInterval) {
        clearInterval(liveTimeInterval);
      }
    };
  }, []);
  const weekDays = [
    { text: "Sunday", value: 0 },
    { text: "Monday", value: 1 },
    { text: "Tuesday", value: 2 },
    { text: "Wednesday", value: 3 },
    { text: "Thursday", value: 4 },
    { text: "Friday", value: 5 },
    { text: "Saturday", value: 6 },
  ];
  const calendarCollections = [
    { CalendarText: "LivTech", CalendarId: 1, CalendarColor: "#fbbf39" },
  ];
  const majorSlotData = [
    { Name: "1 hour", Value: 60 },
    { Name: "2 hours", Value: 120 },
    { Name: "3 hours", Value: 180 },
    { Name: "4 hours", Value: 240 },
    { Name: "5 hours", Value: 300 },
    { Name: "6 hours", Value: 360 },
    { Name: "7 hours", Value: 420 },
    { Name: "8 hours", Value: 480 },
    { Name: "9 hours", Value: 540 },
    { Name: "10 hours", Value: 600 },
    { Name: "11 hours", Value: 660 },
    { Name: "12 hours", Value: 720 },
  ];
  const minorSlotData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const timeFormatData = [
    { Name: "12 hours", Value: "hh:mm a" },
    { Name: "24 hours", Value: "HH:mm" },
  ];
  const weekNumberData = [
    { Name: "Off", Value: "Off" },
    { Name: "First Day of Year", Value: "FirstDay" },
    { Name: "First Full Week", Value: "FirstFullWeek" },
    { Name: "First Four-Day Week", Value: "FirstFourDayWeek" },
  ];
  const tooltipData = [
    { Name: "Off", Value: "Off" },
    { Name: "On", Value: "On" },
  ];
  const updateLiveTime = () => {
    let scheduleTimezone = scheduleObj
      ? scheduleObj.current.timezone
      : "Etc/GMT";
    let liveTime;
    if (scheduleObj.current.isAdaptive) {
      liveTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: scheduleTimezone,
      });
    } else {
      liveTime = new Date().toLocaleTimeString("en-US", {
        timeZone: scheduleTimezone,
      });
    }
    timeBtn.current.innerHTML = liveTime;
  };
  const onToolbarItemClicked = (args) => {
    switch (args.item.text) {
      case "Day":
        setCurrentView(isTimelineView ? "TimelineDay" : "Day");
        break;
      case "Week":
        setCurrentView(isTimelineView ? "TimelineWeek" : "Week");
        break;
      case "WorkWeek":
        setCurrentView(isTimelineView ? "TimelineWorkWeek" : "WorkWeek");
        break;
      case "Month":
        setCurrentView(isTimelineView ? "TimelineMonth" : "Month");
        break;
      case "Year":
        setCurrentView(isTimelineView ? "TimelineYear" : "Year");
        break;
      case "Agenda":
        setCurrentView("Agenda");
        break;
    }
  };
  useEffect(() => {
    let updatedView = currentView;
    switch (currentView) {
      case "Day":
      case "TimelineDay":
        updatedView = isTimelineView ? "TimelineDay" : "Day";
        break;
      case "Week":
      case "TimelineWeek":
        updatedView = isTimelineView ? "TimelineWeek" : "Week";
        break;
      case "WorkWeek":
      case "TimelineWorkWeek":
        updatedView = isTimelineView ? "TimelineWorkWeek" : "WorkWeek";
        break;
      case "Month":
      case "TimelineMonth":
        updatedView = isTimelineView ? "TimelineMonth" : "Month";
        break;
      case "Year":
      case "TimelineYear":
        updatedView = isTimelineView ? "TimelineYear" : "Year";
        break;
      case "Agenda":
        updatedView = "Agenda";
        break;
    }
    scheduleObj.current.currentView = updatedView;
  }, [isTimelineView]);
  const onChange = (args) => {
    setIsTimelineView(args.checked);
  };
  const timelineTemplate = useCallback(() => {
    return (
      <div className="template">
        <div className="icon-child">
          <CheckBoxComponent
            id="timeline_views"
            checked={isTimelineView}
            change={onChange}
          />
        </div>
        <div className="text-child">Timeline Views</div>
      </div>
    );
  }, []);
  const groupTemplate = useCallback(() => {
    return (
      <div className="template">
        <div className="icon-child">
          <CheckBoxComponent
            id="grouping"
            checked={true}
            change={(args) => {
              scheduleObj.current.group.resources = args.checked
                ? ["Calendars"]
                : [];
            }}
          />
        </div>
        <div className="text-child">Grouping</div>
      </div>
    );
  }, []);
  const gridlineTemplate = useCallback(() => {
    return (
      <div className="template">
        <div className="icon-child">
          <CheckBoxComponent
            id="timeSlots"
            checked={true}
            change={(args) => {
              scheduleObj.current.timeScale.enable = args.checked;
            }}
          />
        </div>
        <div className="text-child">Gridlines</div>
      </div>
    );
  }, []);
  const getDateHeaderDay = (value) => {
    return intl.formatDate(value, { skeleton: "E" });
  };
  const getDateHeaderDate = (value) => {
    return intl.formatDate(value, { skeleton: "d" });
  };
  const dateHeaderTemplate = (props) => {
    return (
      <Fragment>
        <div>{getDateHeaderDay(props.date)}</div>
        <div>{getDateHeaderDate(props.date)}</div>
      </Fragment>
    );
  };
  const btnClick = () => {
    let settingsPanel = document.querySelector(
      ".overview-content .right-panel"
    );
    if (settingsPanel.classList.contains("hide")) {
      removeClass([settingsPanel], "hide");
      workWeekObj.current.refresh();
      resourceObj.current.refresh();
    } else {
      addClass([settingsPanel], "hide");
    }
    scheduleObj.current.refreshEvents();
  };
  const weekNumberChange = (args) => {
    if (args.value == "Off") {
      scheduleObj.current.showWeekNumber = false;
    } else {
      scheduleObj.current.showWeekNumber = true;
      scheduleObj.current.weekRule = args.value;
    }
  };
  const tooltipChange = (args) => {
    if (args.value === "Off") {
      scheduleObj.current.eventSettings.enableTooltip = false;
    } else {
      scheduleObj.current.eventSettings.enableTooltip = true;
    }
  };

  return (
    <div>
      <div
        className={`flex justify-between items-center bg-primary1 p-4 rounded-lg transition-opacity ease-in-out duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <div>
          <h1 className="uppercase text-bold text-lg text-slate-100">
            Welcome! <span className="font-bold">{data.firstName}</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-slate-100 font-bold">{data.email}</p>
          <button
            onClick={handleClick}
            className="btn btn-error rounded-lg text-slate-100"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="schedule-control-section">
          <div className="col-lg-12 control-section">
            <div className="content-wrapper">
              <div className="schedule-overview">
                <AppBarComponent
                  colorMode="Primary"
                  className="!bg-primary1 justify-between"
                >
                  <span className="item-center flex">
                    <span className="time e-icons e-clock"></span>
                    <span
                      id="timeBtn"
                      className="time current-time"
                      ref={timeBtn}
                    ></span>
                    <span id="timezoneBtn" className="time ">
                      UTC
                    </span>
                  </span>
                  <ButtonComponent
                    id="settingsBtn"
                    cssClass="overview-toolbar-settings e-inherit"
                    iconCss="e-icons e-settings"
                    iconPosition="Top"
                    content=""
                    onClick={btnClick}
                  />
                </AppBarComponent>
                <ToolbarComponent
                  id="toolbarOptions"
                  cssClass="overview-toolbar"
                  width="100%"
                  height={70}
                  overflowMode="Scrollable"
                  scrollStep={100}
                  created={() =>
                    (liveTimeInterval = setInterval(() => {
                      updateLiveTime();
                    }, 1000))
                  }
                  clicked={onToolbarItemClicked}
                >
                  <ItemsDirective>
                    <ItemDirective
                      prefixIcon="e-icons e-day"
                      tooltipText="Day"
                      text="Day"
                      tabIndex={0}
                    />
                    <ItemDirective
                      prefixIcon="e-icons e-week"
                      tooltipText="Week"
                      text="Week"
                      tabIndex={0}
                    />
                    <ItemDirective
                      prefixIcon="e-icons e-week"
                      tooltipText="WorkWeek"
                      text="WorkWeek"
                      tabIndex={0}
                    />
                    <ItemDirective
                      prefixIcon="e-icons e-month"
                      tooltipText="Month"
                      text="Month"
                      tabIndex={0}
                    />
                    <ItemDirective
                      prefixIcon="e-icons e-month"
                      tooltipText="Year"
                      text="Year"
                      tabIndex={0}
                    />
                    <ItemDirective
                      prefixIcon="e-icons e-agenda-date-range"
                      tooltipText="Agenda"
                      text="Agenda"
                      tabIndex={0}
                    />
                    <ItemDirective
                      tooltipText="Timeline Views"
                      text="Timeline Views"
                      template={timelineTemplate}
                    />
                    <ItemDirective type="Separator" />
                    <ItemDirective
                      tooltipText="Grouping"
                      text="Grouping"
                      template={groupTemplate}
                    />
                    <ItemDirective
                      tooltipText="Timme Slots"
                      text="Timme Slots"
                      template={gridlineTemplate}
                    />
                  </ItemsDirective>
                </ToolbarComponent>
                <div className="overview-content">
                  <div className="left-panel">
                    <div className="overview-scheduler">
                      <ScheduleComponent
                        id="scheduler"
                        cssClass="schedule-overview"
                        readOnly={true}
                        ref={scheduleObj}
                        width="100%"
                        height="100%"
                        currentView={currentView}
                        timezone="UTC"
                        eventSettings={{ dataSource: mappedShifts }}
                        dateHeaderTemplate={dateHeaderTemplate}
                      >
                        <ResourcesDirective>
                          <ResourceDirective
                            field="CalendarId"
                            title="Calendars"
                            name="Calendars"
                            dataSource={calendarCollections}
                            query={new Query().where("CalendarId", "equal", 1)}
                            textField="CalendarText"
                            idField="CalendarId"
                            colorField="CalendarColor"
                          />
                        </ResourcesDirective>
                        <ViewsDirective>
                          <ViewDirective option="Day" />
                          <ViewDirective option="Week" />
                          <ViewDirective option="WorkWeek" />
                          <ViewDirective option="Month" />
                          <ViewDirective option="Year" />
                          <ViewDirective option="Agenda" />
                          <ViewDirective option="TimelineDay" />
                          <ViewDirective option="TimelineWeek" />
                          <ViewDirective option="TimelineWorkWeek" />
                          <ViewDirective option="TimelineMonth" />
                          <ViewDirective option="TimelineYear" />
                        </ViewsDirective>
                        <Inject
                          services={[
                            Day,
                            Week,
                            WorkWeek,
                            Month,
                            Year,
                            Agenda,
                            TimelineViews,
                            TimelineMonth,
                            TimelineYear,
                          ]}
                        />
                      </ScheduleComponent>
                    </div>
                  </div>
                  <div className="right-panel hide">
                    <div className="control-panel e-css">
                      <div className="col-row">
                        <div className="col-left">
                          <label style={{ lineHeight: "34px", margin: "0" }}>
                            First Day of Week
                          </label>
                        </div>
                        <div className="col-right">
                          <DropDownListComponent
                            id="weekFirstDay"
                            dataSource={weekDays}
                            fields={{ text: "text", value: "value" }}
                            value={0}
                            popupHeight={400}
                            change={(args) => {
                              scheduleObj.current.firstDayOfWeek = args.value;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-row">
                        <div className="col-left">
                          <label style={{ lineHeight: "34px", margin: "0" }}>
                            Work week
                          </label>
                        </div>
                        <div className="col-right">
                          <MultiSelectComponent
                            id="workWeekDays"
                            cssClass="schedule-workweek"
                            ref={workWeekObj}
                            dataSource={weekDays}
                            mode="CheckBox"
                            fields={{ text: "text", value: "value" }}
                            enableSelectionOrder={false}
                            showClearButton={false}
                            showDropDownIcon={true}
                            value={[1, 2, 3, 4, 5]}
                            change={(args) =>
                              (scheduleObj.current.workDays = args.value)
                            }
                          >
                            <Inject services={[CheckBoxSelection]} />
                          </MultiSelectComponent>
                        </div>
                      </div>
                      <div className="col-row">
                        <div className="col-left">
                          <label style={{ lineHeight: "34px", margin: "0" }}>
                            Day Start Hour
                          </label>
                        </div>
                        <div className="col-right">
                          <TimePickerComponent
                            id="dayStartHour"
                            showClearButton={false}
                            value={new Date(new Date().setHours(0, 0, 0))}
                            change={(args) =>
                              (scheduleObj.current.startHour = intl.formatDate(
                                args.value,
                                { skeleton: "Hm" }
                              ))
                            }
                          />
                        </div>
                      </div>
                      <div className="col-row">
                        <div className="col-left">
                          <label style={{ lineHeight: "34px", margin: "0" }}>
                            Day End Hour
                          </label>
                        </div>
                        <div className="col-right">
                          <TimePickerComponent
                            id="dayEndHour"
                            showClearButton={false}
                            value={new Date(new Date().setHours(23, 59, 59))}
                            change={(args) =>
                              (scheduleObj.current.endHour = intl.formatDate(
                                args.value,
                                { skeleton: "Hm" }
                              ))
                            }
                          />
                        </div>
                      </div>
                      <div className="col-row">
                        <div className="col-left">
                          <label style={{ lineHeight: "34px", margin: "0" }}>
                            Work Start Hour
                          </label>
                        </div>
                        <div className="col-right">
                          <TimePickerComponent
                            id="workHourStart"
                            showClearButton={false}
                            value={new Date(new Date().setHours(9, 0, 0))}
                            change={(args) =>
                              (scheduleObj.current.workHours.start =
                                intl.formatDate(args.value, { skeleton: "Hm" }))
                            }
                          />
                        </div>
                      </div>
                      <div className="col-row">
                        <div className="col-left">
                          <label style={{ lineHeight: "34px", margin: "0" }}>
                            Work End Hour
                          </label>
                        </div>
                        <div className="col-right">
                          <TimePickerComponent
                            id="workHourEnd"
                            showClearButton={false}
                            value={new Date(new Date().setHours(18, 0, 0))}
                            change={(args) =>
                              (scheduleObj.current.workHours.end =
                                intl.formatDate(args.value, { skeleton: "Hm" }))
                            }
                          />
                        </div>
                      </div>
                      <div className="col-row">
                        <div className="col-left">
                          <label style={{ lineHeight: "34px", margin: "0" }}>
                            Slot Duration
                          </label>
                        </div>
                        <div className="col-right">
                          <DropDownListComponent
                            id="slotDuration"
                            dataSource={majorSlotData}
                            fields={{ text: "Name", value: "Value" }}
                            value={180}
                            popupHeight={150}
                            change={(args) => {
                              scheduleObj.current.timeScale.interval =
                                args.value;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-row">
                        <div className="col-left">
                          <label style={{ lineHeight: "34px", margin: "0" }}>
                            Slot Interval
                          </label>
                        </div>
                        <div className="col-right">
                          <DropDownListComponent
                            id="slotInterval"
                            dataSource={minorSlotData}
                            value={2}
                            popupHeight={150}
                            change={(args) => {
                              scheduleObj.current.timeScale.slotCount =
                                args.value;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-row">
                        <div className="col-left">
                          <label style={{ lineHeight: "34px", margin: "0" }}>
                            Time Format
                          </label>
                        </div>
                        <div className="col-right">
                          <DropDownListComponent
                            id="timeFormat"
                            dataSource={timeFormatData}
                            fields={{ text: "Name", value: "Value" }}
                            value={"hh:mm a"}
                            popupHeight={150}
                            change={(args) => {
                              scheduleObj.current.timeFormat = args.value;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-row">
                        <div className="col-left">
                          <label style={{ lineHeight: "34px", margin: "0" }}>
                            Week Numbers
                          </label>
                        </div>
                        <div className="col-right">
                          <DropDownListComponent
                            id="weekNumber"
                            dataSource={weekNumberData}
                            fields={{ text: "Name", value: "Value" }}
                            value={"Off"}
                            popupHeight={150}
                            change={weekNumberChange}
                          />
                        </div>
                      </div>
                      <div className="col-row">
                        <div className="col-left">
                          <label style={{ lineHeight: "34px", margin: "0" }}>
                            Tooltip
                          </label>
                        </div>
                        <div className="col-right">
                          <DropDownListComponent
                            id="tooltip"
                            dataSource={tooltipData}
                            fields={{ text: "Name", value: "Value" }}
                            value={"Off"}
                            popupHeight={150}
                            change={tooltipChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
