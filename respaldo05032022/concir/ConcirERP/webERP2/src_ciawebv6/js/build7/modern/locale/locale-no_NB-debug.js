Ext.define('Ext.locale.no_NB.ux.colorpick.Selector', {
    override: 'Ext.ux.colorpick.Selector',

    okButtonText: 'OK',
    cancelButtonText: 'Avbryt'
});
// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.no_NB.Component", {
    override: "Ext.Component"
});
Ext.define('Ext.locale.no_NB.Dialog', {
    override: 'Ext.Dialog',

    config: {
        maximizeTool: {
            tooltip: "Maksimer til fullskjerm"
        },
        restoreTool: {
            tooltip: "Gjenopprett til originalstørrelse"
        }
    }
});
Ext.define("Ext.locale.no_NB.LoadMask", {
    override: "Ext.LoadMask",

    config: {
        message: 'Laster...'
    }
});
Ext.define('Ext.locale.no_NB.Panel', {
    override: 'Ext.Panel',

    config: {
        standardButtons: {
            ok: {
                text: 'OK'
            },
            abort: {
                text: 'Avbryte'
            },
            retry: {
                text: 'Prøv på nytt'
            },
            ignore: {
                text: 'Overse'
            },
            yes: {
                text: 'Ja'
            },
            no: {
                text: 'Nei'
            },
            cancel: {
                text: 'Avbryt'
            },
            apply: {
                text: 'Søke om'
            },
            save: {
                text: 'Lagre'
            },
            submit: {
                text: 'Sende inn'
            },
            help: {
                text: 'Hjelp'
            },
            close: {
                text: 'Lukk'
            }
        },
        closeToolText: 'Lukk Panel'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Bound', {
    override: 'Ext.data.validator.Bound',

    config: {
        emptyMessage: 'Må være tilstede',
        minOnlyMessage: 'Må være minst {0}',
        maxOnlyMessage: 'Må ikke være mer enn {0}',
        bothMessage: 'Må være mellom {0} og {1}'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.CIDRv4', {
    override: 'Ext.data.validator.CIDRv4',

    config: {
        message: 'Er ikke en gyldig CIDR-blokk'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.CIDRv6', {
    override: 'Ext.data.validator.CIDRv6',

    config: {
        message: 'Er ikke en gyldig CIDR-blokk'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Currency', {
    override: 'Ext.data.validator.Currency',

    config: {
        message: 'Er ikke et gyldig valuta beløp'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Date', {
    override: 'Ext.data.validator.Date',

    config: {
        message: "Er ikke en gyldig dato"
    }
});
Ext.define('Ext.locale.no_NB.data.validator.DateTime', {
    override: 'Ext.data.validator.DateTime',

    config: {
        message: 'Er ikke gyldig dato og klokkeslett'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Email', {
    override: 'Ext.data.validator.Email',

    config: {
        message: 'Er ikke en gyldig e-postadresse'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Exclusion', {
    override: 'Ext.data.validator.Exclusion',

    config: {
        message: 'Er en verdi som er utelukket'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Format', {
    override: 'Ext.data.validator.Format',

    config: {
        message: 'Den har feil format'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.IPAddress', {
    override: 'Ext.data.validator.IPAddress',

    config: {
        message: 'Er ikke en gyldig IP-adresse'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Inclusion', {
    override: 'Ext.data.validator.Inclusion',

    config: {
        message: 'Det er ikke på listen over akseptable verdier'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Length', {
    override: 'Ext.data.validator.Length',

    config: {
        minOnlyMessage: 'Lengden må være minst {0}',
        maxOnlyMessage: 'Lengden må ikke være mer enn {0}',
        bothMessage: 'Lengden må være mellom {0} og {1}'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Number', {
    override: 'Ext.data.validator.Number',

    config: {
        message: 'Er ikke et gyldig nummer'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Phone', {
    override: 'Ext.data.validator.Phone',

    config: {
        message: 'Er ikke et gyldig telefonnummer'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Presence', {
    override: 'Ext.data.validator.Presence',

    config: {
        message: 'Må være tilstede'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Range', {
    override: 'Ext.data.validator.Range',

    config: {
        nanMessage: 'Det må være numerisk',
        minOnlyMessage: 'Må være minst {0}',
        maxOnlyMessage: 'Må verdien være mindre enn {0}',
        bothMessage: 'Må være mellom {0} og {1}'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Time', {
    override: 'Ext.data.validator.Time',

    config: {
        message: 'Er ikke en gyldig klokkeslett'
    }
});
Ext.define('Ext.locale.no_NB.data.validator.Url', {
    override: 'Ext.data.validator.Url',

    config: {
        message: 'Er ikke en gyldig nettadresse'
    }
});
Ext.define('Ext.locale.no_NB.dataview.Abstract', {
    override: 'Ext.dataview.Abstract',

    config: {
        loadingText: 'Laster...'
    }
});
Ext.define("Ext.locale.no_NB.dataview.DataView", {
    override: "Ext.dataview.DataView",

    config: {
        emptyText: "ingen data som skal vises"
    }
});
Ext.define('Ext.locale.no_NB.dataview.EmptyText', {
    override: 'Ext.dataview.EmptyText',

    config: {
        html: 'ingen data å vise'
    }
});
Ext.define('Ext.locale.no_NB.dataview.List', {
    override: 'Ext.dataview.List',

    config: {
        loadingText: 'Laster...'
    }
});
Ext.define('Ext.locale.no_NB.dataview.plugin.ListPaging', {
    override: 'Ext.dataview.plugin.ListPaging',

    config: {
        loadMoreText: 'Legg inn mer ...',
        noMoreRecordsText: 'Ingen flere poster'
    }
});
/**
 * Norwegian Translations
 */
Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli",
                               "August", "September", "Oktober", "November", "Desember"];

        Ext.Date.getShortMonthName = function(month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            Mai: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Okt: 9,
            Nov: 10,
            Des: 11
        };

        Ext.Date.getMonthNumber = function(name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3)
            .toLowerCase()];
        };

        Ext.Date.dayNames = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag",
                             "Lørdag"];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: 'kr',
            // Norwegian Krone
            dateFormat: 'd.m.Y'
        });
    }
});
Ext.define('Ext.locale.no_NB.field.Date', {
    override: 'Ext.field.Date',

    minDateMessage: 'Datoen i dette feltet må være etter {0}',
    maxDateMessage: 'Datoen i dette feltet må være før {0}'
});
Ext.define('Ext.locale.no_NB.field.Field', {
    override: 'Ext.field.Field',

    config: {
        requiredMessage: 'Dette feltet er påkrevd',
        validationMessage: 'Er i feil format'
    }
});
Ext.define("Ext.locale.no_NB.field.FileButton", {
    override: "Ext.field.FileButton",

    config: {
        text: 'Arkiv ...'
    }
});
Ext.define('Ext.locale.no_NB.field.Number', {
    override: 'Ext.field.Number',

    decimalsText: 'Maksimal desimaltall er (0)',
    minValueText: 'Den minste verdien for dette feltet er {0}',
    maxValueText: 'Den største verdien for dette feltet er {0}',
    badFormatMessage: '{0} er ikke et gyldig nummer'
});
Ext.define('Ext.locale.no_NB.field.Text', {
    override: 'Ext.field.Text',

    badFormatMessage: 'Verdi stemmer ikke overens med det nødvendige formatet',
    config: {
        requiredMessage: 'Dette feltet er påkrevd',
        validationMessage: 'Er i feil format'
    }
});
Ext.define("Ext.locale.no_NB.grid.filters.menu.Base", {
    override: "Ext.grid.filters.menu.Base",

    config: {
        text: "Filter"
    }
});
Ext.define("Ext.locale.no_NB.grid.locked.Grid", {
    override: 'Ext.grid.locked.Grid',

    config: {
        columnMenu: {
            items: {
                region: {
                    text: 'Region'
                }
            }
        },
        regions: {
            left: {
                menuLabel: 'Låst (Venstre)'
            },
            center: {
                menuLabel: 'Låst'
            },
            right: {
                menuLabel: 'Låst (Høyre)'
            }
        }
    }
});
Ext.define("Ext.locale.no_NB.grid.menu.Columns", {
    override: "Ext.grid.menu.Columns",

    config: {
        text: "Kolonner"
    }
});
Ext.define("Ext.locale.no_NB.grid.menu.GroupByThis", {
    override: "Ext.grid.menu.GroupByThis",

    config: {
        text: "Gruppe av dette"
    }
});
Ext.define("Ext.locale.no_NB.grid.menu.ShowInGroups", {
    override: "Ext.grid.menu.ShowInGroups",

    config: {
        text: "Vis i grupper"
    }
});
Ext.define("Ext.locale.no_NB.grid.menu.SortAsc", {
    override: "Ext.grid.menu.SortAsc",

    config: {
        text: "Sorter stigende"
    }
});
Ext.define("Ext.locale.no_NB.grid.menu.SortDesc", {
    override: "Ext.grid.menu.SortDesc",

    config: {
        text: "Sorter synkende"
    }
});
Ext.define("Ext.locale.no_NB.grid.plugin.RowDragDrop", {
    override: "Ext.grid.plugin.RowDragDrop",
    dragText: "{0} markert(e) rad(er)"
});
Ext.define('Ext.locale.no_NB.panel.Collapser', {
    override: 'Ext.panel.Collapser',

    config: {
        collapseToolText: "Lukk panel",
        expandToolText: "Utvid panel"
    }
});
Ext.define('Ext.locale.no_NB.panel.Date', {
    override: 'Ext.panel.Date',

    config: {
        nextText: 'Neste måned (Control+Pil Høyre)',
        prevText: 'Forrige måned (Control+Pil Venstre)',
        buttons: {
            footerTodayButton: {
                text: "I dag"
            }
        }
    }
});
Ext.define('Ext.locale.no_NB.picker.Date', {
    override: 'Ext.picker.Date',

    config: {
        doneButton: 'done',
        monthText: 'Måned',
        dayText: 'Dag',
        yearText: 'ar'
    }
});
Ext.define('Ext.locale.no_NB.picker.Picker', {
    override: 'Ext.picker.Picker',

    config: {
        doneButton: 'done',
        cancelButton: 'Avbryt'
    }
});
