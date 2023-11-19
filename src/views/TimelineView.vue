       
        <template id="timeline-template">
            <ul class="timeline">
                <!-- <li v-for="item in items" 
                 
                    :item="item" :key="item.id">
                </li> -->


                <li v-for="item in items" 
                 
                :item="item" :key="item.id" class="timeline-item pulse_wrap">
                    <div class="timeline-badge {{ item.icon_status }}"><i class="{{ item.icon_class }}"></i></div>
                        <div class="timeline-panel {{ item.element_status }} {{ item.element_day_marker }}">
                            <div class="timeline-heading">
                                <h4 class="timeline-title {{ item.text_status }}">{{ item.title }}</h4>
                                <div class="timeline-panel-controls">
                                    <div class="controls">
                                        <a 
                                           v-for="(control,i) in item.controls"                                    
                                           :control="control" :key="i">
                                        </a>
                                    </div>
                                    <div class="timestamp">
                                        <small class="">{{ item.created }}</small>
                                    </div>
                                </div>
                            </div>
                            <div class="timeline-body">{{item.body }}</div>
                        </div>
                 
                </li>



            </ul>
        </template>
    
        <!-- <template id="timeline-item-template">
            <li class="timeline-item {{ item.action_needed }}">
                <div class="timeline-badge {{ item.icon_status }}"><i class="{{ item.icon_class }}"></i></div>
                    <div class="timeline-panel {{ item.element_status }} {{ item.element_day_marker }}">
                        <div class="timeline-heading">
                            <h4 class="timeline-title {{ item.text_status }}">{{ item.title }}</h4>
                            <div class="timeline-panel-controls">
                                <div class="controls">
                                    <a 
                                       v-for="control in item.controls" 
                                       is="timeline-control" 
                                       :control="control">
                                    </a>
                                </div>
                                <div class="timestamp">
                                    <small class="">{{ item.created }}</small>
                                </div>
                            </div>
                        </div>
                        <div class="timeline-body">{{{ item.body }}}</div>
                    </div>
                </div>
            </li>
        </template> -->
    


<script>
// inspiré de https://codepen.io/jfg-progi/pen/dazomb
export default {
    name: "TimelineView",
    data(){
        return{
            items: [
          {
                id: 1,
                element_status: '',
                icon_class: 'glyphicon glyphicon-log-out',
                icon_status: 'success',
                title: 'DELIVERY',
                controls: [],
                created: '',
                body: 'To plan, created by Insurer',
                action_needed: 'pulse_wrap'
          },
          {
                id: 2,
                element_status: 'main_element',
                icon_class: 'glyphicon glyphicon-log-out',
                icon_status: 'success',
                title: 'DELIVERY',
                controls: [],
                created: '',
                body: 'To plan, created by Insurer',
                action_needed: 'pulse_wrap'
          },
          {
                id: 3,
                element_status: 'main_element',
                icon_class: 'glyphicon glyphicon-log-out',
                icon_status: 'success',
                title: 'DELIVERY',
                controls: [],
                created: 'Monday Oct. 4 - 10:00',
                body: 'In 16 days, created by you'
            },
          {
                id: 4,
                icon_class: 'glyphicon glyphicon-wrench',
                icon_status: 'planning',
                title: 'REPAIR END',
                controls: [],
                created: 'Monday Oct. 3 - 8:00',
                body: 'In 15 days, expected in Planning'
            },
          {
                id: 5,
                icon_class: 'glyphicon glyphicon-wrench',
                icon_status: 'planning',
                title: 'REPAIR START',
                controls: [],
                created: 'Monday Sept. 30 - 10:00',
                body: 'In 12 days, expected in Planning'
            },
            {
                id: 6,
                icon_class: 'glyphicon glyphicon-log-in',
                icon_status: 'success',
                title: 'DROP-OFF',
                controls: [],
                created: 'Friday Sept. 24 - 14:30',
                body: 'In 3 days, created by you'
            },
            {
                id: 7,
                element_day_marker: 'today',
                icon_class: 'glyphicon glyphicon-arrow-up',
                icon_status: 'warning',
                title: '',
                controls: [],
                created: '',
                body: ''
            },
            {
                id: 8,
                element_day_marker: 'past',
                icon_class: 'glyphicon glyphicon-edit',
                icon_status: '',
                title: 'ESTIMATION',
                controls: [],
                created: 'Tuesday Sept. 20 - 15:00',
                body: 'Follow-up required, self-booking',
                action_needed: 'pulse_wrap'
            },
            {
                id: 9,
                element_status: 'selected_past',
                element_day_marker: 'past',
                icon_class: 'glyphicon glyphicon-edit',
                icon_status: '',
                title: 'ESTIMATION',
                controls: [],
                created: 'Tuesday Sept. 20 - 15:00',
                body: 'Follow-up required, self-booking',
                action_needed: 'pulse_wrap'
            },
            {
                id: 10,
                element_day_marker: 'past',
                icon_class: 'glyphicon glyphicon-edit',
                icon_status: '',
                title: 'ESTIMATION',
                controls: [],
                created: 'Tuesday Sept. 20 - 15:00',
                body: '4 days ago, self-booking'
            },
            {
                id: 11,
                element_day_marker: 'past',
                icon_class: 'glyphicon glyphicon-edit',
                icon_status: '',
                text_status: 'cancelled',
                title: 'ESTIMATION',
                controls: [],
                created: 'Monday Sept. 16 - 15:00',
                body: 'Cancelled, created by Desjardins'
            },
            {
                id: 12,
                element_day_marker: 'past',
                icon_class: 'glyphicon glyphicon-edit',
                icon_status: '',
                text_status: 'cancelled',
                title: 'ESTIMATION',
                controls: [],
                created: '',
                body: 'Cancelled, created by Desjardins'
            },
                      {
                id: 13,
                element_status: 'selected_past',
                icon_class: 'glyphicon glyphicon-log-out',
                icon_status: 'past',
                title: 'ESTIMATION',
                controls: [],
                created: 'Monday Oct. 4 - 10:00',
                body: '16 days ago, created by you'
            },
        ]
        }
    }
}
</script>

<style scoped>
@import 'https://fonts.googleapis.com/css?family=Libre+Franklin';

body {
    font-family: 'Libre Franklin', sans-serif;
}

#timeline-header {
    font-size: 26px;
}

.cancelled {
    text-decoration: line-through;
}

.timeline-panel.today {
    height: 5px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    margin-top: 0px;
    margin-bottom: 10px;
    background: #000;

    &:before {
        visibility: hidden !important;
        display: none !important;
    }

    &:after {
        visibility: hidden !important;
        display: none !important;
    }
}

.timeline-badge.warning {
    top: -20px !important;
}

.timeline-panel.past {
    background: #eee;

    &:after {
        border-right: 14px solid #eee !important;
    }
}

.timeline-panel.main_element {
    font-weight: bolder;
    color: #FFFFFF !important;
    background: #0196a3;
    border-color: #0196a3 !important;

    &:after {
        border-right: 14px solid #0196a3 !important;
    }
}

.timeline-panel.selected_past {
    font-weight: bolder;
    color: #FFFFFF !important;
    background: #333;
    border-color: #333 !important;

    &:after {
        border-right: 14px solid #333 !important;
    }
}

.timeline {
    list-style: none;
    padding: 10px 0 10px;
    position: relative;
    width: 420px;

    &:before {
        background-color: #eee;
        bottom: 0;
        content: " ";
        left: 50px;
        margin-left: -1.5px;
        position: absolute;
        top: 0;
        width: 3px;
    }

    >li {
        margin-bottom: 10px;
        position: relative;

        &:before,
        &:after {
            content: " ";
            display: table;
        }

        &:after {
            clear: both;
        }

        >.timeline-panel {
            border-radius: 2px;
            border: 1px solid #d4d4d4;
            box-shadow: 0 1px 2px rgba(100, 100, 100, 0.2);
            margin-left: 100px;
            padding: 20px;
            position: relative;

            .timeline-heading {
                .timeline-panel-controls {
                    position: absolute;
                    right: 8px;
                    top: 5px;

                    .timestamp {
                        display: inline-block;
                    }

                    .controls {
                        display: inline-block;
                        padding-right: 5px;
                        border-right: 1px solid #aaa;

                        a {
                            color: #999;
                            font-size: 11px;
                            padding: 0 5px;

                            &:hover {
                                color: #333;
                                text-decoration: none;
                                cursor: pointer;
                            }
                        }
                    }

                    .controls+.timestamp {
                        padding-left: 5px;
                    }
                }
            }
        }

        .timeline-badge {
            background-color: #999;
            border-radius: 50%;
            color: #fff;
            font-size: 1.4em;
            height: 50px;
            left: 50px;
            line-height: 52px;
            margin-left: -25px;
            position: absolute;
            text-align: center;
            top: 16px;
            width: 50px;
            z-index: 100;
        }

        .timeline-badge+.timeline-panel {
            &:before {
                border-bottom: 15px solid transparent;
                border-left: 0 solid #ccc;
                border-right: 15px solid #ccc;
                border-top: 15px solid transparent;
                content: " ";
                display: inline-block;
                position: absolute;
                left: -15px;
                right: auto;
                top: 26px;
            }

            &:after {
                border-bottom: 14px solid transparent;
                border-left: 0 solid #fff;
                border-right: 14px solid #fff;
                border-top: 14px solid transparent;
                content: " ";
                display: inline-block;
                position: absolute;
                left: -14px;
                right: auto;
                top: 27px;
            }
        }
    }
}

.timeline-badge {
    &.primary {
        background-color: #2e6da4 !important;
    }

    &.success {
        background-color: #0196a3 !important;
    }

    &.warning {
        background-color: #000000 !important;
    }

    &.danger {
        background-color: #d9534f !important;
    }

    &.info {
        background-color: #5bc0de !important;
    }

    &.planning {
        background-color: #00629c !important;
    }
}

.timeline-title {
    margin-top: 0;
    color: inherit;
}

.timeline-body {

    >p,
    >ul {
        margin-bottom: 0;
    }

    >p+p {
        margin-top: 5px;
    }
}

.copy {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #aaa;
    font-size: 11px;

    >* {
        color: #444;
    }
}


/*============================
				ANIMATIONS
=============================*/
.pulse_wrap {
    animation: pulse 1.5s ease-in-out alternate infinite;

}

@keyframes pulse {
    0% {
        opacity: 0.8;
        transform: scale(0.95);
        /* //margin-left: -20px;*/
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }


}</style>