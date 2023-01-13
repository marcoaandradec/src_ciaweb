Ext.define('Ext.locale.ko.ux.colorpick.Selector', {
    override: 'Ext.ux.colorpick.Selector',

    okButtonText: '확인',
    cancelButtonText: '취소'
});
// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.ko.Component", {
    override: "Ext.Component"
});
Ext.define('Ext.locale.ko.Dialog', {
    override: 'Ext.Dialog',

    config: {
        maximizeTool: {
            tooltip: "전체 화면으로 최대화"
        },
        restoreTool: {
            tooltip: "원래 크기로 복원 "
        }
    }
});
Ext.define("Ext.locale.ko.LoadMask", {
    override: "Ext.LoadMask",

    config: {
        message: '로딩중...'
    }
});
Ext.define('Ext.locale.ko.Panel', {
    override: 'Ext.Panel',

    config: {
        standardButtons: {
            ok: {
                text: 'OK'
            },
            abort: {
                text: '중단'
            },
            retry: {
                text: '다시 해 보다'
            },
            ignore: {
                text: '무시'
            },
            yes: {
                text: '예'
            },
            no: {
                text: '아니오'
            },
            cancel: {
                text: '취소'
            },
            apply: {
                text: '적용'
            },
            save: {
                text: '저장'
            },
            submit: {
                text: '제출'
            },
            help: {
                text: '도와'
            },
            close: {
                text: '閉じる'
            }
        },
        closeToolText: 'Panel 閉じる'
    }
});
Ext.define('Ext.locale.ko.data.validator.Bound', {
    override: 'Ext.data.validator.Bound',

    config: {
        emptyMessage: '存在する必要があります',
        minOnlyMessage: '적어도 {0} 이상이어야합니다.',
        maxOnlyMessage: '{0}보다 크지 않아야합니다.',
        bothMessage: '값은 {0}에서 {1} 사이에 해야 합니다 '
    }
});
Ext.define('Ext.locale.ko.data.validator.CIDRv4', {
    override: 'Ext.data.validator.CIDRv4',

    config: {
        message: '유효한 CIDR 블록이 아닙니다.'
    }
});
Ext.define('Ext.locale.ko.data.validator.CIDRv6', {
    override: 'Ext.data.validator.CIDRv6',

    config: {
        message: '유효한 CIDR 블록이 아닙니다.'
    }
});
Ext.define('Ext.locale.ko.data.validator.Currency', {
    override: 'Ext.data.validator.Currency',

    config: {
        message: '유효한 통화 금액이 아닙니다.'
    }
});
Ext.define('Ext.locale.ko.data.validator.Date', {
    override: 'Ext.data.validator.Date',

    config: {
        message: "유효한 날짜가 아닙니다."
    }
});
Ext.define('Ext.locale.ko.data.validator.DateTime', {
    override: 'Ext.data.validator.DateTime',

    config: {
        message: '유효한 날짜 및 시간이 아닙니다.'
    }
});
Ext.define('Ext.locale.ko.data.validator.Email', {
    override: 'Ext.data.validator.Email',

    config: {
        message: '유효한 이메일 주소가 아닙니다.'
    }
});
Ext.define('Ext.locale.ko.data.validator.Exclusion', {
    override: 'Ext.data.validator.Exclusion',

    config: {
        message: '제외 된 가치인가요?'
    }
});
Ext.define('Ext.locale.ko.data.validator.Format', {
    override: 'Ext.data.validator.Format',

    config: {
        message: '형식이 다릅니다'
    }
});
Ext.define('Ext.locale.ko.data.validator.IPAddress', {
    override: 'Ext.data.validator.IPAddress',

    config: {
        message: '유효한 IP 주소가 아닙니다.'
    }
});
Ext.define('Ext.locale.ko.data.validator.Inclusion', {
    override: 'Ext.data.validator.Inclusion',

    config: {
        message: '허용 되는 값 목록에 포함 되어 있지 않습니다. '
    }
});
Ext.define('Ext.locale.ko.data.validator.Length', {
    override: 'Ext.data.validator.Length',

    config: {
        minOnlyMessage: '길이는 적어도 {0} 이상이어야합니다.',
        maxOnlyMessage: '길이는 {0}보다 커야합니다.',
        bothMessage: '길이는 {0}에서 {1} 사이 여야합니다.'
    }
});
Ext.define('Ext.locale.ko.data.validator.Number', {
    override: 'Ext.data.validator.Number',

    config: {
        message: '숫자가 아닙니다'
    }
});
Ext.define('Ext.locale.ko.data.validator.Phone', {
    override: 'Ext.data.validator.Phone',

    config: {
        message: '올바른 전화 번호가 아닙니다.'
    }
});
Ext.define('Ext.locale.ko.data.validator.Presence', {
    override: 'Ext.data.validator.Presence',

    config: {
        message: '반드시 존재해야합니다'
    }
});
Ext.define('Ext.locale.ko.data.validator.Range', {
    override: 'Ext.data.validator.Range',

    config: {
        nanMessage: '숫자로 해야 합니다 ',
        minOnlyMessage: '적어도 {0} 이상이어야합니다.',
        maxOnlyMessage: '{0}보다 크지 않아야합니다.',
        bothMessage: '값은 {0}에서 {1} 사이에 해야 합니다 '
    }
});
Ext.define('Ext.locale.ko.data.validator.Time', {
    override: 'Ext.data.validator.Time',

    config: {
        message: '유효한 시간이 아닙니다'
    }
});
Ext.define('Ext.locale.ko.data.validator.Url', {
    override: 'Ext.data.validator.Url',

    config: {
        message: '유효한 URL이 아닙니다.'
    }
});
Ext.define('Ext.locale.ko.dataview.Abstract', {
    override: 'Ext.dataview.Abstract',

    config: {
        loadingText: '로딩중...'
    }
});
Ext.define("Ext.locale.ko.dataview.DataView", {
    override: "Ext.dataview.DataView",

    config: {
        emptyText: "표시 할 데이터가 없습니다"
    }
});
Ext.define('Ext.locale.ko.dataview.EmptyText', {
    override: 'Ext.dataview.EmptyText',

    config: {
        html: '표시 할 내용이 없습니다'
    }
});
Ext.define('Ext.locale.ko.dataview.List', {
    override: 'Ext.dataview.List',

    config: {
        loadingText: '로딩중...'
    }
});
Ext.define('Ext.locale.ko.dataview.plugin.ListPaging', {
    override: 'Ext.dataview.plugin.ListPaging',

    config: {
        loadMoreText: '추가로드 ...',
        noMoreRecordsText: '더 이상 레코드 없음'
    }
});
/**
 * Korean translation
 */
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월",
                               "10월", "11월", "12월"];

        Ext.Date.dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: ',',
            decimalSeparator: '.',
            currencySign: '\u20a9',
            // Korean Won
            dateFormat: 'm/d/Y'
        });
    }
});
Ext.define('Ext.locale.ko.field.Date', {
    override: 'Ext.field.Date',

    minDateMessage: '이 필드의 날짜는 {0} 이후 날짜로 설정하십시오.',
    maxDateMessage: '이 필드의 날짜는 {0} 이전 날짜로 설정하십시오.'
});
Ext.define('Ext.locale.ko.field.Field', {
    override: 'Ext.field.Field',

    config: {
        requiredMessage: '이 필드는 필수입니다',
        validationMessage: '형식이 잘못되었습니다'
    }
});
Ext.define('Ext.locale.ko.field.FileButton', {
    override: 'Ext.field.FileButton',

    config: {
        text: '리뷰 ...'
    }
});
Ext.define('Ext.locale.ko.field.Number', {
    override: 'Ext.field.Number',

    decimalsText: '이 필드의 최소값은 {0}입니다.',
    minValueText: '최소값은 {0}입니다.',
    maxValueText: '최대값은 {0}입니다.',
    badFormatMessage: '{0}는 올바른 숫자가 아닙니다.'
});
Ext.define('Ext.locale.ko.field.Text', {
    override: 'Ext.field.Text',

    badFormatMessage: '값이 필요한 형식과 일치하지 않습니다',
    config: {
        requiredMessage: '이 필드는 필수입니다',
        validationMessage: '형식이 잘못되었습니다'
    }
});
Ext.define("Ext.locale.ko.grid.filters.menu.Base", {
    override: "Ext.grid.filters.menu.Base",

    config: {
        text: "필터"
    }
});
Ext.define('Ext.locale.ko.grid.locked.Grid', {
    override: 'Ext.grid.locked.Grid',

    config: {
        columnMenu: {
            items: {
                region: {
                    text: '부위'
                }
            }
        },
        regions: {
            left: {
                menuLabel: '잠김 (왼쪽)'
            },
            center: {
                menuLabel: '잠김 해제'
            },
            right: {
                menuLabel: '잠김 (오른쪽)'
            }
        }
    }
});
Ext.define("Ext.locale.ko.grid.menu.Columns", {
    override: "Ext.grid.menu.Columns",

    config: {
        text: "칼럼 목록"
    }
});
Ext.define("Ext.locale.ko.grid.menu.GroupByThis", {
    override: "Ext.grid.menu.GroupByThis",

    config: {
        text: "이 항목별로 그룹화"
    }
});
Ext.define("Ext.locale.ko.grid.menu.ShowInGroups", {
    override: "Ext.grid.menu.ShowInGroups",

    config: {
        text: "그룹으로 표시"
    }
});
Ext.define("Ext.locale.ko.grid.menu.SortAsc", {
    override: "Ext.grid.menu.SortAsc",

    config: {
        text: "오름차순 정렬"
    }
});
Ext.define("Ext.locale.ko.grid.menu.SortDesc", {
    override: "Ext.grid.menu.SortDesc",

    config: {
        text: "내림차순 정렬"
    }
});
Ext.define("Ext.locale.ko.grid.plugin.RowDragDrop", {
    override: "Ext.grid.plugin.RowDragDrop",
    dragText: "{0} 개가 선택되었습니다."
});
Ext.define('Ext.locale.ko.panel.Collapser', {
    override: 'Ext.panel.Collapser',

    config: {
        collapseToolText: "패널 닫기",
        expandToolText: "패널 열기"
    }
});
Ext.define('Ext.locale.ko.panel.Date', {
    override: 'Ext.panel.Date',

    config: {
        nextText: '다음달(컨트롤키+오른쪽 화살표)',
        prevText: '이전달 (컨트롤키+왼족 화살표)',
        buttons: {
            footerTodayButton: {
                text: "오늘"
            }
        }
    }
});
Ext.define('Ext.locale.ko.picker.Date', {
    override: 'Ext.picker.Date',

    config: {
        doneButton: 'done',
        monthText: '월',
        dayText: '일',
        yearText: '년'
    }
});
Ext.define('Ext.locale.ko.picker.Picker', {
    override: 'Ext.picker.Picker',

    config: {
        doneButton: 'done',
        cancelButton: '취소'
    }
});
