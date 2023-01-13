Ext.define('Ext.locale.nl.ux.colorpick.Selector', {
    override: 'Ext.ux.colorpick.Selector',

    okButtonText: 'OK',
    cancelButtonText: 'Annuleren'
});
// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.nl.Component", {
    override: "Ext.Component"
});
Ext.define('Ext.locale.nl.Dialog', {
    override: 'Ext.Dialog',

    config: {
        maximizeTool: {
            tooltip: "Maximaliseren naar volledig scherm"
        },
        restoreTool: {
            tooltip: "herstellen naar origineel formaat"
        }
    }
});
Ext.define("Ext.locale.nl.LoadMask", {
    override: "Ext.LoadMask",

    config: {
        message: 'Bezig met laden...'
    }
});
Ext.define('Ext.locale.nl.Panel', {
    override: 'Ext.Panel',

    config: {
        standardButtons: {
            ok: {
                text: 'OK'
            },
            abort: {
                text: 'Afbreken'
            },
            retry: {
                text: 'opnieuw proberen'
            },
            ignore: {
                text: 'Negeren'
            },
            yes: {
                text: 'Ja'
            },
            no: {
                text: 'Nee'
            },
            cancel: {
                text: 'annuleren'
            },
            apply: {
                text: 'Van toepassing zijn'
            },
            save: {
                text: 'Opslaan'
            },
            submit: {
                text: 'voorleggen'
            },
            help: {
                text: 'Helpen'
            },
            close: {
                text: 'Sluiten'
            }
        },
        closeToolText: 'Sluiten Panel'
    }
});
Ext.define('Ext.locale.nl.data.validator.Bound', {
    override: 'Ext.data.validator.Bound',

    config: {
        emptyMessage: 'Moet aanwezig zijn',
        minOnlyMessage: 'Moet ten minste {0} zijn',
        maxOnlyMessage: 'Moet niet meer zijn dan {0}',
        bothMessage: 'Moet tussen {0} en {1} liggen'
    }
});
Ext.define('Ext.locale.nl.data.validator.CIDRv4', {
    override: 'Ext.data.validator.CIDRv4',

    config: {
        message: 'Is geen geldig CIDR-blok'
    }
});
Ext.define('Ext.locale.nl.data.validator.CIDRv6', {
    override: 'Ext.data.validator.CIDRv6',

    config: {
        message: 'Is geen geldig CIDR-blok'
    }
});
Ext.define('Ext.locale.nl.data.validator.Currency', {
    override: 'Ext.data.validator.Currency',

    config: {
        message: 'Is geen geldig valutabedrag'
    }
});
Ext.define('Ext.locale.nl.data.validator.Date', {
    override: 'Ext.data.validator.Date',

    config: {
        message: "Is geen geldige datum"
    }
});
Ext.define('Ext.locale.nl.data.validator.DateTime', {
    override: 'Ext.data.validator.DateTime',

    config: {
        message: 'Is geen geldige datum en tijd'
    }
});
Ext.define('Ext.locale.nl.data.validator.Email', {
    override: 'Ext.data.validator.Email',

    config: {
        message: 'Is geen geldig e-mailadres'
    }
});
Ext.define('Ext.locale.nl.data.validator.Exclusion', {
    override: 'Ext.data.validator.Exclusion',

    config: {
        message: 'Is een waarde die is uitgesloten'
    }
});
Ext.define('Ext.locale.nl.data.validator.Format', {
    override: 'Ext.data.validator.Format',

    config: {
        message: 'Het heeft de verkeerde indeling'
    }
});
Ext.define('Ext.locale.nl.data.validator.IPAddress', {
    override: 'Ext.data.validator.IPAddress',

    config: {
        message: 'Is geen geldig IP-adres'
    }
});
Ext.define('Ext.locale.nl.data.validator.Inclusion', {
    override: 'Ext.data.validator.Inclusion',

    config: {
        message: 'Het staat niet in de lijst met aanvaardbare waarden'
    }
});
Ext.define('Ext.locale.nl.data.validator.Length', {
    override: 'Ext.data.validator.Length',

    config: {
        minOnlyMessage: 'De lengte moet ten minste {0} zijn',
        maxOnlyMessage: 'Lengte mag niet meer zijn dan {0}',
        bothMessage: 'De lengte moet liggen tussen {0} en {1}'
    }
});
Ext.define('Ext.locale.nl.data.validator.Number', {
    override: 'Ext.data.validator.Number',

    config: {
        message: 'Is geen geldig nummer'
    }
});
Ext.define('Ext.locale.nl.data.validator.Phone', {
    override: 'Ext.data.validator.Phone',

    config: {
        message: 'Is geen geldig telefoonnummer'
    }
});
Ext.define('Ext.locale.nl.data.validator.Presence', {
    override: 'Ext.data.validator.Presence',

    config: {
        message: 'Moet aanwezig zijn'
    }
});
Ext.define('Ext.locale.nl.data.validator.Range', {
    override: 'Ext.data.validator.Range',

    config: {
        nanMessage: 'Het moet numeriek zijn',
        minOnlyMessage: 'Moet ten minste {0} zijn',
        maxOnlyMessage: 'Moet niet meer zijn dan {0}',
        bothMessage: 'Moet tussen {0} en {1} liggen'
    }
});
Ext.define('Ext.locale.nl.data.validator.Time', {
    override: 'Ext.data.validator.Time',

    config: {
        message: 'Is geen geldige tijd'
    }
});
Ext.define('Ext.locale.nl.data.validator.Url', {
    override: 'Ext.data.validator.Url',

    config: {
        message: 'Is geen geldige URL'
    }
});
Ext.define('Ext.locale.nl.dataview.Abstract', {
    override: 'Ext.dataview.Abstract',

    config: {
        loadingText: 'Bezig met laden...'
    }
});
Ext.define("Ext.locale.nl.dataview.DataView", {
    override: "Ext.dataview.DataView",

    config: {
        emptyText: "geen gegevens om weer te geven"
    }
});
Ext.define('Ext.locale.nl.dataview.EmptyText', {
    override: 'Ext.dataview.EmptyText',

    config: {
        html: 'geen gegevens om weer te geven'
    }
});
Ext.define('Ext.locale.nl.dataview.List', {
    override: 'Ext.dataview.List',

    config: {
        loadingText: 'Bezig met laden...'
    }
});
Ext.define('Ext.locale.nl.dataview.plugin.ListPaging', {
    override: 'Ext.dataview.plugin.ListPaging',

    config: {
        loadMoreText: 'Meer laden',
        noMoreRecordsText: 'geen records meer opnemen'
    }
});
/**
 * Dutch Translations
 */

Ext.onReady(function() {

    if (Ext.Date) {
        Ext.Date.monthNames = ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
                               'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

        Ext.Date.getShortMonthName = function(month) {
            // eslint-disable-next-line eqeqeq
            if (month == 2) {
                return 'mrt';
            }

            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            jan: 0,
            feb: 1,
            mrt: 2,
            apr: 3,
            mei: 4,
            jun: 5,
            jul: 6,
            aug: 7,
            sep: 8,
            okt: 9,
            nov: 10,
            dec: 11
        };

        Ext.Date.getMonthNumber = function(name) {
            var sname = name.substring(0, 3).toLowerCase();

            if (sname === 'maa') {
                return 2;
            }

            return Ext.Date.monthNumbers[sname];
        };

        Ext.Date.dayNames = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag',
                             'zaterdag'];

        Ext.Date.getShortDayName = function(day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.parseCodes.S.s = "(?:ste|e)";
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u20ac',
            // Dutch Euro
            dateFormat: 'j-m-Y'
        });
    }
});
Ext.define('Ext.locale.nl.field.Date', {
    override: 'Ext.field.Date',

    minDateMessage: 'De datum in dit veld moet na {0} liggen',
    maxDateMessage: 'De datum in dit veld moet voor {0} liggen'
});
Ext.define('Ext.locale.nl.field.Field', {
    override: 'Ext.field.Field',

    config: {
        requiredMessage: 'Dit veld is verplicht',
        validationMessage: 'heeft de verkeerde indeling'
    }
});
Ext.define("Ext.locale.nl.field.FileButton", {
    override: "Ext.field.FileButton",

    config: {
        text: 'Archief...'
    }
});
Ext.define('Ext.locale.nl.field.Number', {
    override: 'Ext.field.Number',

    decimalsText: 'Het maximale decimale getal is (0)',
    minValueText: 'De minimale waarde van dit veld is {0}',
    maxValueText: 'De maximale cijfers achter de komma is {0}',
    badFormatMessage: '{0} is geen geldig getal'
});
Ext.define('Ext.locale.nl.field.Text', {
    override: 'Ext.field.Text',

    badFormatMessage: 'Waarde komt niet overeen met het vereiste formaat',
    config: {
        requiredMessage: 'Dit veld is mogelijk niet leeg',
        validationMessage: 'heeft de verkeerde indeling'
    }
});
Ext.define("Ext.locale.nl.grid.filters.menu.Base", {
    override: "Ext.grid.filters.menu.Base",

    config: {
        text: "Filter"
    }
});
Ext.define('Ext.locale.nl.grid.locked.Grid', {
    override: 'Ext.grid.locked.Grid',

    config: {
        columnMenu: {
            items: {
                region: {
                    text: 'Regio'
                }
            }
        },
        regions: {
            left: {
                menuLabel: 'Vergrendeld (Links)'
            },
            center: {
                menuLabel: 'Ontgrendeld'
            },
            right: {
                menuLabel: 'Vergrendeld (Rechts)'
            }
        }
    }
});
Ext.define("Ext.locale.nl.grid.menu.Columns", {
    override: "Ext.grid.menu.Columns",

    config: {
        text: "Kolommen"
    }
});
Ext.define("Ext.locale.nl.grid.menu.GroupByThis", {
    override: "Ext.grid.menu.GroupByThis",

    config: {
        text: "Groepeer op deze manier"
    }
});
Ext.define("Ext.locale.nl.grid.menu.ShowInGroups", {
    override: "Ext.grid.menu.ShowInGroups",

    config: {
        text: "Weergeven in groepen"
    }
});
Ext.define("Ext.locale.nl.grid.menu.SortAsc", {
    override: "Ext.grid.menu.SortAsc",

    config: {
        text: "Sorteer oplopend"
    }
});
Ext.define("Ext.locale.nl.grid.menu.SortDesc", {
    override: "Ext.grid.menu.SortDesc",

    config: {
        text: "Sorteer aflopend"
    }
});
Ext.define("Ext.locale.nl.grid.plugin.RowDragDrop", {
    override: "Ext.grid.plugin.RowDragDrop",
    dragText: '{0} geselecteerde rij(en)'
});
Ext.define('Ext.locale.nl.panel.Collapser', {
    override: 'Ext.panel.Collapser',

    config: {
        collapseToolText: "Venster sluiten",
        expandToolText: "paneel Uitvouwen"
    }
});
Ext.define('Ext.locale.nl.panel.Date', {
    override: 'Ext.panel.Date',

    config: {
        nextText: 'Volgende maand (Ctrl+rechts)',
        prevText: 'Vorige maand (Ctrl+links)',
        buttons: {
            footerTodayButton: {
                text: "Vandaag"
            }
        }
    }
});
Ext.define('Ext.locale.nl.picker.Date', {
    override: 'Ext.picker.Date',

    config: {
        doneButton: 'Gedaan',
        monthText: 'Maand',
        dayText: 'Dag',
        yearText: 'Jaar'
    }
});
Ext.define('Ext.locale.nl.picker.Picker', {
    override: 'Ext.picker.Picker',

    config: {
        doneButton: 'Gedaan',
        cancelButton: 'Annuleren'
    }
});
