Ext.define('Ext.locale.ja.ux.colorpick.Selector', {
    override: 'Ext.ux.colorpick.Selector',

    okButtonText: 'OK',
    cancelButtonText: 'キャンセル'
});
// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.ja.Component", {
    override: "Ext.Component"
});
Ext.define('Ext.locale.ja.Dialog', {
    override: 'Ext.Dialog',

    config: {
        maximizeTool: {
            tooltip: "全画面表示に最大化"
        },
        restoreTool: {
            tooltip: "元のサイズに復元"
        }
    }
});
Ext.define("Ext.locale.ja.LoadMask", {
    override: "Ext.LoadMask",

    config: {
        message: '読み込み中...'
    }
});
Ext.define('Ext.locale.ja.Panel', {
    override: 'Ext.Panel',

    config: {
        standardButtons: {
            ok: {
                text: 'OK'
            },
            abort: {
                text: 'やめる'
            },
            retry: {
                text: 'リトライ'
            },
            ignore: {
                text: '無視する'
            },
            yes: {
                text: 'はい'
            },
            no: {
                text: 'いいえ'
            },
            cancel: {
                text: 'キャンセル'
            },
            apply: {
                text: '適用する'
            },
            save: {
                text: '保存する'
            },
            submit: {
                text: '提出する'
            },
            help: {
                text: '助けて'
            },
            close: {
                text: '閉じる'
            }
        },
        closeToolText: 'Panel 閉じる'
    }
});
Ext.define('Ext.locale.ja.data.validator.Bound', {
    override: 'Ext.data.validator.Bound',

    config: {
        emptyMessage: '存在する必要があります',
        minOnlyMessage: '少なくとも{0}にする必要があります',
        maxOnlyMessage: '{0}以下にする必要があります',
        bothMessage: '値は{0}と{1}の間になければなりません'
    }
});
Ext.define('Ext.locale.ja.data.validator.CIDRv4', {
    override: 'Ext.data.validator.CIDRv4',

    config: {
        message: '有効なCIDRブロックではありません'
    }
});
Ext.define('Ext.locale.ja.data.validator.CIDRv6', {
    override: 'Ext.data.validator.CIDRv6',

    config: {
        message: '有効なCIDRブロックではありません'
    }
});
Ext.define('Ext.locale.ja.data.validator.Currency', {
    override: 'Ext.data.validator.Currency',

    config: {
        message: '有効な通貨金額ではありません'
    }

});
Ext.define('Ext.locale.ja.data.validator.Date', {
    override: 'Ext.data.validator.Date',

    config: {
        message: "有効な日付ではありません"
    }
});
Ext.define('Ext.locale.ja.data.validator.DateTime', {
    override: 'Ext.data.validator.DateTime',

    config: {
        message: '有効な日時ではありません'
    }
});
Ext.define('Ext.locale.ja.data.validator.Email', {
    override: 'Ext.data.validator.Email',

    config: {
        message: '有効なメールアドレスではありません'
    }
});
Ext.define('Ext.locale.ja.data.validator.Exclusion', {
    override: 'Ext.data.validator.Exclusion',

    config: {
        message: '除外された値です'
    }
});
Ext.define('Ext.locale.ja.data.validator.Format', {
    override: 'Ext.data.validator.Format',

    config: {
        message: 'フォーマットが違います'
    }
});
Ext.define('Ext.locale.ja.data.validator.IPAddress', {
    override: 'Ext.data.validator.IPAddress',

    config: {
        message: '有効なIPアドレスではありません'
    }
});
Ext.define('Ext.locale.ja.data.validator.Inclusion', {
    override: 'Ext.data.validator.Inclusion',

    config: {
        message: '許容値のリストに含まれていません'
    }
});
Ext.define('Ext.locale.ja.data.validator.Length', {
    override: 'Ext.data.validator.Length',

    config: {
        minOnlyMessage: '長さは少なくとも{0}でなければなりません',
        maxOnlyMessage: '長さは{0}を超えてはいけません',
        bothMessage: '長さは{0}と{1}の間でなければなりません'
    }
});
Ext.define('Ext.locale.ja.data.validator.Number', {
    override: 'Ext.data.validator.Number',

    config: {
        message: '数字ではありません'
    }
});
Ext.define('Ext.locale.ja.data.validator.Phone', {
    override: 'Ext.data.validator.Phone',

    config: {
        message: '有効な電話番号ではありません'
    }
});
Ext.define('Ext.locale.ja.data.validator.Presence', {
    override: 'Ext.data.validator.Presence',

    config: {
        message: '存在している必要があります'
    }
});
Ext.define('Ext.locale.ja.data.validator.Range', {
    override: 'Ext.data.validator.Range',

    config: {
        nanMessage: '数値でなければなりません',
        minOnlyMessage: '少なくとも{0}にする必要があります',
        maxOnlyMessage: '{0}以下にする必要があります',
        bothMessage: '値は{0}と{1}の間になければなりません'
    }
});
Ext.define('Ext.locale.ja.data.validator.Time', {
    override: 'Ext.data.validator.Time',

    config: {
        message: '有効な時間ではありません'
    }
});
Ext.define('Ext.locale.ja.data.validator.Url', {
    override: 'Ext.data.validator.Url',

    config: {
        message: '有効なURLではありません'
    }
});
Ext.define('Ext.locale.ja.dataview.Abstract', {
    override: 'Ext.dataview.Abstract',

    config: {
        loadingText: '読み込み中...'
    }
});
Ext.define("Ext.locale.ja.dataview.DataView", {
    override: "Ext.dataview.DataView",

    config: {
        emptyText: "表示するデータがありません"
    }
});
Ext.define('Ext.locale.ja.dataview.EmptyText', {
    override: 'Ext.dataview.EmptyText',

    config: {
        html: '表示するデータがありません'
    }
});
Ext.define('Ext.locale.ja.dataview.List', {
    override: 'Ext.dataview.List',

    config: {
        loadingText: '読み込み中...'
    }
});
Ext.define('Ext.locale.ja.dataview.plugin.ListPaging', {
    override: 'Ext.dataview.plugin.ListPaging',

    config: {
        loadMoreText: 'さらに読み込む...',
        noMoreRecordsText: 'これ以上レコードがない'
    }
});
/**
 * Japanese translation
 */
Ext.onReady(function() {
    var parseCodes;

    if (Ext.Date) {
        Ext.Date.monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月',
                               '10月', '11月', '12月'];

        Ext.Date.defaultFormat = 'd.m.Y';
        Ext.Date.defaultTimeFormat = 'H:i';

        Ext.Date.getShortMonthName = function(month) {
            return "" + (month + 1);
        };

        Ext.Date.monthNumbers = {
            "1": 0,
            "2": 1,
            "3": 2,
            "4": 3,
            "5": 4,
            "6": 5,
            "7": 6,
            "8": 7,
            "9": 8,
            "10": 9,
            "11": 10,
            "12": 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, name.length - 1)];
            // or simply parseInt(name.substring(0, name.length - 1)) - 1
        };

        Ext.Date.dayNames = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 1); // just remove "曜日" suffix
        };

        Ext.Date.formatCodes.a = "(this.getHours() < 12 ? '午前' : '午後')";
        Ext.Date.formatCodes.A = "(this.getHours() < 12 ? '午前' : '午後')"; // no case difference

        parseCodes = {
            g: 1,
            c: "if (/(午前)/i.test(results[{0}])) {\n" +
                "if (!h || h == 12) { h = 0; }\n" +
                "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
            s: "(午前|午後)",
            calcAtEnd: true
        };

        Ext.Date.parseCodes.a = Ext.Date.parseCodes.A = parseCodes;
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: ',',
            decimalSeparator: '.',
            currencySign: '\u00a5',
            // Japanese Yen
            dateFormat: 'Y/m/d'
        });
    }
});
Ext.define('Ext.locale.ja.field.Date', {
    override: 'Ext.field.Date',

    minDateMessage: 'このフィールドの日付は、 {0} 以降の日付に設定してください。',
    maxDateMessage: 'このフィールドの日付は、 {0} 以前の日付に設定してください。'
});
Ext.define('Ext.locale.ja.field.Field', {
    override: 'Ext.field.Field',

    config: {
        requiredMessage: 'このフィールドは必須です',
        validationMessage: '形式が間違っています'
    }
});
Ext.define("Ext.locale.ja.field.FileButton", {
    override: "Ext.field.FileButton",

    config: {
        text: '参照...'
    }
});
Ext.define('Ext.locale.ja.field.Number', {
    override: 'Ext.field.Number',

    decimalsText: 'このフィールドの最小値は {0} です。',
    minValueText: 'このフィールドの最小値は {0} です。',
    maxValueText: 'このフィールドの最大値は {0} です。',
    badFormatMessage: '{0} は数値ではありません。'
});
Ext.define('Ext.locale.ja.field.Text', {
    override: 'Ext.field.Text',

    badFormatMessage: '値が必要なフォーマットと一致しません',
    config: {
        requiredMessage: 'このフィールドは必須です',
        validationMessage: '形式が間違っています'
    }
});
Ext.define("Ext.locale.ja.grid.filters.menu.Base", {
    override: "Ext.grid.filters.menu.Base",

    config: {
        text: "フィルタ"
    }
});
Ext.define("Ext.locale.ja.grid.locked.Grid", {
    override: 'Ext.grid.locked.Grid',

    config: {
        columnMenu: {
            items: {
                region: {
                    text: '領域'
                }
            }
        },
        regions: {
            left: {
                menuLabel: 'ロック（左）'
            },
            center: {
                menuLabel: 'ロック解除'
            },
            right: {
                menuLabel: 'ロック（右）'
            }
        }
    }
});
Ext.define("Ext.locale.ja.grid.menu.Columns", {
    override: "Ext.grid.menu.Columns",

    config: {
        text: "カラム"
    }
});
Ext.define("Ext.locale.ja.grid.menu.GroupByThis", {
    override: "Ext.grid.menu.GroupByThis",

    config: {
        text: "これでグループ化する"
    }
});
Ext.define("Ext.locale.ja.grid.menu.ShowInGroups", {
    override: "Ext.grid.menu.ShowInGroups",

    config: {
        text: "グループで表示"
    }
});
Ext.define("Ext.locale.ja.grid.menu.SortAsc", {
    override: "Ext.grid.menu.SortAsc",

    config: {
        text: "昇順"
    }
});
Ext.define("Ext.locale.ja.grid.menu.SortDesc", {
    override: "Ext.grid.menu.SortDesc",

    config: {
        text: "降順"
    }
});
Ext.define("Ext.locale.ja.grid.plugin.RowDragDrop", {
    override: "Ext.grid.plugin.RowDragDrop",
    dragText: "{0} 行選択"
});
Ext.define('Ext.locale.ja.panel.Collapser', {
    override: 'Ext.panel.Collapser',

    config: {
        collapseToolText: "パネルを閉じる",
        expandToolText: "パネルを開く"
    }
});
Ext.define('Ext.locale.ja.panel.Date', {
    override: 'Ext.panel.Date',

    config: {
        nextText: '次月へ (コントロール+右)',
        prevText: '前月へ (コントロール+左)',
        buttons: {
            footerTodayButton: {
                text: "今日"
            }
        }
    }
});
Ext.define('Ext.locale.ja.picker.Date', {
    override: 'Ext.picker.Date',

    config: {
        doneButton: 'done',
        monthText: '月',
        dayText: '日',
        yearText: '年'
    }
});
Ext.define('Ext.locale.ja.picker.Picker', {
    override: 'Ext.picker.Picker',

    config: {
        doneButton: 'done',
        cancelButton: 'キャンセル'
    }
});
