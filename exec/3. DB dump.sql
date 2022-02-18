DROP database sweethome;
create database sweethome;
use sweethome;

create table agreed_house
(
    agreed_house_id  bigint   not null auto_increment,
    created_at       datetime not null,
    deleted_at       datetime,
    updated_at       datetime,
    agreement_status bit,
    agreement_id     bigint,
    apt_house_id     bigint,
    primary key (agreed_house_id)
);


create table agreement
(
    agreement_id bigint       not null auto_increment,
    created_at   datetime     not null,
    deleted_at   datetime,
    updated_at   datetime,
    content      longtext     not null,
    end_date     datetime,
    start_date   datetime,
    title        varchar(100) not null,
    apt_id       bigint,
    primary key (agreement_id)
);


create table apt
(
    apt_id       bigint not null auto_increment,
    apt_name     varchar(255),
    apt_number   varchar(255),
    dong_name    varchar(255),
    gungu_name   varchar(255),
    road_apt_num integer,
    road_name    varchar(255),
    sido_name    varchar(255),
    zip_code     varchar(255),
    primary key (apt_id)
);


create table apt_house
(
    apt_house_id bigint not null auto_increment,
    dong         varchar(255),
    ho           varchar(255),
    apt_id       bigint,
    primary key (apt_house_id)
);


create table article
(
    article_id bigint       not null auto_increment,
    created_at datetime     not null,
    deleted_at datetime,
    updated_at datetime,
    blocked_at datetime,
    content    longtext     not null,
    image_url  varchar(255),
    title      varchar(255) not null,
    board_id   bigint,
    member_id  bigint,
    primary key (article_id)
);


create table article_like
(
    article_like_id bigint   not null auto_increment,
    created_at      datetime not null,
    deleted_at      datetime,
    updated_at      datetime,
    article_id      bigint,
    member_id       bigint,
    primary key (article_like_id)
);


create table article_report
(
    article_report_id bigint   not null auto_increment,
    created_at        datetime not null,
    deleted_at        datetime,
    updated_at        datetime,
    content           varchar(255),
    article_id        bigint,
    member_id         bigint,
    primary key (article_report_id)
);


create table board
(
    board_id     bigint      not null auto_increment,
    created_at   datetime    not null,
    deleted_at   datetime,
    updated_at   datetime,
    board_status bit,
    description  varchar(50) not null,
    name         varchar(20) not null,
    apt_id       bigint,
    primary key (board_id)
);


create table board_favorite
(
    board_favorite_id bigint   not null auto_increment,
    created_at        datetime not null,
    deleted_at        datetime,
    updated_at        datetime,
    board_id          bigint,
    member_id         bigint,
    primary key (board_favorite_id)
);


create table comment
(
    comment_id bigint       not null auto_increment,
    created_at datetime     not null,
    deleted_at datetime,
    updated_at datetime,
    blocked_at datetime,
    content    varchar(255) not null,
    is_removed bit,
    article_id bigint,
    member_id  bigint,
    parent_id  bigint,
    primary key (comment_id)
);


create table comment_like
(
    comment_like_id bigint   not null auto_increment,
    created_at      datetime not null,
    deleted_at      datetime,
    updated_at      datetime,
    comment_id      bigint,
    member_id       bigint,
    primary key (comment_like_id)
);


create table comment_report
(
    comment_report_id bigint   not null auto_increment,
    created_at        datetime not null,
    deleted_at        datetime,
    updated_at        datetime,
    content           varchar(255),
    comment_id        bigint,
    member_id         bigint,
    primary key (comment_report_id)
);


create table member
(
    member_id    bigint       not null auto_increment,
    created_at   datetime     not null,
    deleted_at   datetime,
    updated_at   datetime,
    authority    varchar(255),
    email        varchar(50)  not null,
    image_url    varchar(255),
    kakao_id     varchar(255),
    password     varchar(255) not null,
    phone_number varchar(11),
    username     varchar(20)  not null,
    apt_house_id bigint,
    primary key (member_id)
);


create table message
(
    message_id                bigint   not null auto_increment,
    created_at                datetime not null,
    deleted_at                datetime,
    updated_at                datetime,
    sender_receiver_delimiter varchar(255),
    message_content_id        bigint,
    receive_member_id         bigint,
    send_member_id            bigint,
    primary key (message_id)
);


create table message_content
(
    message_content_id bigint       not null auto_increment,
    created_at         datetime     not null,
    deleted_at         datetime,
    updated_at         datetime,
    content            varchar(400) not null,
    read_at            datetime,
    title              varchar(100) not null,
    primary key (message_content_id)
);


create table refresh_token
(
    email varchar(255) not null,
    token varchar(255),
    primary key (email)
);


create table register_apt_house
(
    register_apt_house_id bigint       not null auto_increment,
    created_at            datetime     not null,
    deleted_at            datetime,
    updated_at            datetime,
    dong                  varchar(255),
    ho                    varchar(255),
    message               varchar(400) not null,
    apt_id                bigint,
    member_id             bigint,
    primary key (register_apt_house_id)
);


create table register_apt_manager
(
    register_apt_manager_id bigint       not null auto_increment,
    created_at              datetime     not null,
    deleted_at              datetime,
    updated_at              datetime,
    apt_name                varchar(255),
    apt_number              varchar(255),
    dong_name               varchar(255),
    gungu_name              varchar(255),
    message                 varchar(400) not null,
    road_apt_num            integer,
    road_name               varchar(255),
    sido_name               varchar(255),
    zip_code                varchar(255),
    apt_id                  bigint,
    member_id               bigint,
    primary key (register_apt_manager_id)
);


create table report_type
(
    report_type_id bigint not null auto_increment,
    content        varchar(255),
    primary key (report_type_id)
);

INSERT INTO apt (apt_id, sido_name, gungu_name, dong_name, road_Name, road_apt_num, apt_number,
                 zip_code, apt_name)
values ( 1, '운영시', '운영구', '운영동', '운영시 운영구 운영로 1', 1, '0000000000000000000000000', 00000,
        '운영자의 집');

insert into apt_house (apt_house_id, apt_id, dong, ho)
values (1, 1, null, null);

insert into member (MEMBER_ID, apt_house_id, AUTHORITY, CREATED_AT, DELETED_AT, EMAIL, PASSWORD,
                    PHONE_NUMBER, UPDATED_AT, USERNAME)
values (1, 1, 'ROLE_ADMIN', current_timestamp, null, 'admin@admin.com',
        '{bcrypt}$2a$10$zD2fe40OBkKpyObMPLEuK.ww8Yc0i2THiSaMuIder2UN.vKZFdxTO', '00000000000', null,
        '사이트관리자');
        
INSERT INTO report_type (REPORT_TYPE_ID, CONTENT) VALUES(1, '욕설, 비방, 차별, 혐오'), (2, '홍보, 영리 목적'), (3, '불법 정보'), (4, '음란, 청소년 유해'), (5, '개인 정보 노출, 유포, 거래'), (6, '도배, 스팸'), (7, '기타');
        
select * from member;
select * from report_type;